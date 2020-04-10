/* eslint-disable func-names */


exports.getMaskStatuses = async function (username, masks) {
  return this._db()
    .table('mask')
    .column('name', 'enabled')
    .innerJoin('user', 'user.id', 'mask.user_id')
    .whereIn('name', masks)
    .andWhere('user.username', '=', username)
    .orderBy('name', 'asc')
}



exports.saveNewMasks = async function (userId, newMasks) {
  return this._db().raw(`
    insert into mask (user_id, name, enabled)
    values
      ${newMasks.map(() => '(?,?,?) ')}
    on conflict do nothing
  `,
  newMasks.reduce((m, v) => {
    m = m.concat([ userId, v, true ])
    return m
  }, []))
}



exports.updateMaskStatus = async function (userId, name, enabled) {
  return this._db().raw(`
    update mask
    set
      enabled = ?
    where name = ? and user_id = ?
  `, [ enabled, name, userId ])
}



exports.getMasks = async function (userId, { page = 1, resultsPerPage = 1000000 }) {
  const [ { count: totalResults } ] = await this._db().raw(`
    select
      count(distinct(m.id))
    from "mask" m
    inner join "user" u on u.id = m.user_id
    where u.id = ?
  `, [ userId ])

  const items = await this._db().raw(`
    select
      m.name as "name", m.enabled as "enabled"
    from "mask" m
    inner join "user" u on u.id = m.user_id
    where u.id = ?
    limit ?
    offset ?
  `, [ userId, resultsPerPage, page - 1 ])

  return {
    items,
    paging: {
      totalResults,
      page,
      numPages: parseInt(Math.ceil(totalResults / resultsPerPage), 10),
    }
  }
}



