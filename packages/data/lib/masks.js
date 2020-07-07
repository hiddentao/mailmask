/* eslint-disable func-names */

const { _, getCurrentPeriod, SUB } = require('@mailmask/utils')


exports._createMaskOrFetchExisting = async function ({ usernameId, mask }, trx) {
  mask = mask.toLowerCase()

  // do an upsert to see if row already exists
  let ret = await this._db().raw(`
    INSERT INTO mask (username_id, name, enabled)
    VALUES (?, ?, ?)
    ON CONFLICT DO NOTHING
    RETURNING (id);
  `, [ usernameId, mask, true ])
    .transacting(trx)

  let [ id ] = this._extractReturnedDbIds(ret)

  // if the id is not set then it means the row already existed, in which case we
  // must again query the table to get the id (this is a limitation of the ON
  // CONFLICT DO NOTHING clause)
  if (!id) {
    ret = await this._db().table('mask')
      .select('id')
      .where({
        name: mask,
        usernameId,
      })
      .limit(1)
      .transacting(trx)

    id = _.get(ret, '0.id')
  }

  return id
}




exports.getPossibleMask = async function (username, mask) {
  username = username.toLowerCase()
  mask = mask.toLowerCase()

  /*
  If username exists but mask does not the query WILL return a result
  If username exists but has no active subscription the query WILL NOT return a result
  If username does not exist then the query WILL NOT return a result
  */

  const ret = await this._db().table('username')
    .select(
      'user.id as user_id',
      'username.email as email',
      'username.id as username_id',
      'mask.name as mask',
      'mask.enabled as enabled',
      'sub.plan as plan',
      'stats.num_bytes as num_bytes',
    )
    .innerJoin('user', 'user.id', 'username.user_id')
    .innerJoin('sub', 'user.id', 'sub.user_id')
    .joinRaw(`LEFT JOIN mask on (mask.username_id = username.id AND mask.name = ?)`, mask)
    .joinRaw(`LEFT JOIN stats on (stats.mask_id = mask.id AND stats.period = ?)`, getCurrentPeriod())
    .where('username.username', username)
    .andWhere('user.deleted', false)
    .andWhere(function () {
      this.whereIn('sub.status', [ SUB.STATUS.ACTIVE, SUB.STATUS.PAYMENT_FAILED ])
    })
    .orderBy('sub.created_at', 'desc')
    .limit(1)

  return _.get(ret, '0')
}





exports.updateMaskStatus = async function (userId, name, enabled) {
  name = name.toLowerCase()

  return this._db().raw(`
    UPDATE mask
    SET enabled = ?
    FROM username
    WHERE (username.id = mask.username_id AND mask.name = ? AND username.user_id = ?)
  `, [ enabled, name, userId ])
}



exports.getCurrentPeriodStats = async function (userId) {
  const period = getCurrentPeriod()

  const [ { numMessages, numBytes, lastReceived } ] = await this._db().raw(`
    select
      sum(s.num_messages) as "numMessages",
      sum(s.num_bytes) as "numBytes",
      max(s.last_received) as "lastReceived"
    from "stats" s
    inner join "mask" m on m.id = s.mask_id
    inner join "username" u on u.id = m.username_id
    where (u.user_id = ? and s.period = ?)
  `, [ userId, period ])

  return {
    maskStats: {
      period,
      numBytes,
      numMessages,
      lastReceived,
    }
  }
}



exports.getMasks = async function (userId, { page = 1, resultsPerPage = 1000000 }) {
  const period = getCurrentPeriod()

  const [ { count: totalResults } ] = await this._db().raw(`
    select
      count(distinct(m.id))
    from "mask" m
    inner join "username" un on un.id = m.username_id
    inner join "user" u on u.id = un.user_id
    where u.id = ?
  `, [ userId ])

  const ret = await this._db().raw(`
    select
      m.name as "name",
      m.enabled as "enabled",
      un.id as "usernameId",
      un.username as "username",
      un.email as "email",
      s.num_bytes as "numBytes",
      s.num_messages as "numMessages",
      s.last_received as "lastReceived"
    from "mask" m
    inner join "username" un on un.id = m.username_id
    inner join "user" u on u.id = un.user_id
    left join "stats" s on (s.mask_id = m.id and s.period = ?)
    where (u.id = ? and u.deleted = ?)
    limit ?
    offset ?
  `, [ period, userId, false, resultsPerPage, page - 1 ])

  const items = ret.map(({
    name,
    enabled,
    usernameId,
    username,
    email,
    numBytes,
    numMessages,
    lastReceived,
  }) => {
    return {
      name,
      enabled,
      username: {
        id: usernameId,
        username,
        email,
      },
      stats: {
        period,
        numBytes,
        numMessages,
        lastReceived,
      }
    }
  })

  return {
    items,
    paging: {
      totalResults,
      page,
      numPages: parseInt(Math.ceil(totalResults / resultsPerPage), 10),
    }
  }
}



exports.updateMaskStatsForReceivedEmail = async function ({
  usernameId,
  mask,
  numBytes,
  receivedAt
}) {
  await this._dbTrans(async trx => {
    const period = getCurrentPeriod()

    const lastReceived = receivedAt

    const maskId = await this._createMaskOrFetchExisting({ usernameId, mask }, trx)

    await this._db().raw(`
      INSERT INTO stats (mask_id, period, num_bytes, num_messages, last_received)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT (mask_id, period) DO UPDATE
        SET num_bytes = stats.num_bytes + ?, num_messages = stats.num_messages + 1, last_received = ?
    `, [
      maskId,
      period,
      numBytes,
      1,
      lastReceived,
      numBytes,
      lastReceived,
    ])
      .transacting(trx)
  })
}
