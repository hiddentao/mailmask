/* eslint-disable func-names */
const { _, LEGAL, SUB } = require('@mailmask/utils')

const { tsStr } = require('./utils')

exports._createUserOrFetchExisting = async function ({ email, chosenPlan, chosenSchedule }, trx) {
  email = email.toLowerCase()

  let ret = await this._db().table('user')
    .select()
    .where({ email })
    .limit(1)
    .transacting(trx)

  let id = _.get(ret, '0.id')

  if (!id) {
    ret = await this._db().table('user')
      .insert({ email })
      .returning('id')
      .transacting(trx)

    ;([ id ] = this._extractReturnedDbIds(ret))

    if (chosenPlan) {
      await this._db().table('sub')
        .insert({
          userId: id,
          plan: chosenPlan || SUB.PLAN.BASIC,
          schedule: chosenSchedule || SUB.SCHEDULE.MONTHLY,
          status: SUB.STATUS.SELECTED,
        })
        .transacting(trx)
    }
  }

  return id
}



exports._getUser = async function ({ modifier }) {
  const rows = await this._db()
    .select(
      'user.*',
      'username.id as username_id',
      'username.username as username_username',
      'username.email as username_email',
      'legal.id as legal_id',
      'legal.type as legal_type',
      'legal.version as legal_version',
      'user_legal.created_at as legal_accepted',
      'sub.created_at as sub_created_at',
      'sub.id as sub_id',
      'sub.plan as sub_plan',
      'sub.schedule as sub_schedule',
      'sub.status as sub_status',
      'sub.next_payment_date as sub_next_payment_date',
      'sub.next_payment_amount as sub_next_payment_amount',
      'sub.paddle_sub_id as sub_paddle_sub_id',
      'sub.paddle_checkout_id as sub_paddle_checkout_id',
    )
    .from('user')
    .leftJoin('username', 'user.id', 'username.user_id')
    .leftJoin('sub', 'user.id', 'sub.user_id')
    .leftJoin('user_legal', 'user.id', 'user_legal.user_id')
    .leftJoin('legal', 'user_legal.legal_id', 'legal.id')
    .where('deleted', false)
    .orderBy('sub.created_at', 'desc')
    .modify(modifier)

  if (!rows.length) {
    return null
  }

  const [ firstRow ] = rows

  const u = _.pick(firstRow, [
    'id',
    'email',
  ])

  if (firstRow.subPlan) {
    u.sub = this._extractPrefixedValues(firstRow, 'sub', [
      'id', 'createdAt', 'plan', 'schedule', 'status',
      'nextPaymentDate', 'nextPaymentAmount',
      'paddleSubId', 'paddleCheckoutId'
    ])
  }

  const usernames = Object.values(
    rows.reduce(
      (m, { usernameId, usernameUsername, usernameEmail }) => {
        if (usernameId) {
          m[usernameId] = {
            id: usernameId,
            username: usernameUsername,
            email: usernameEmail,
          }
        }
        return m
      },
      {}
    )
  )

  if (usernames.length) {
    u.usernames = usernames
  }

  const legal = Object.values(
    rows.reduce(
      (m, { legalId, legalType, legalVersion, legalAccepted }) => {
        if (legalType) {
          if (!m[legalType] || legalVersion > m[legalType].version) {
            m[legalType] = {
              id: legalId,
              type: legalType,
              version: legalVersion,
              accepted: legalAccepted
            }
          }
        }
        return m
      },
      {}
    )
  )

  if (legal.length) {
    u.legal = legal
  }

  return u
}



exports._getLegalIds = async function (trx) {
  const ids = Object.keys(LEGAL).reduce((m, v) => {
    m[v] = null
    return m
  }, {})

  const ret = await this._db().table('legal')
    .select('id', 'type')
    .orderBy('version', 'desc')
    .transacting(trx)

  ret.forEach(({ id, type }) => {
    if (!ids[type]) {
      ids[type] = id
    }
  })

  return ids
}


exports._getTermsId = async function (trx) {
  const ret = await this._db().table('legal')
    .select('id')
    .where({ type: 'TERMS_AND_CONDITIONS' })
    .orderBy('version', 'desc')
    .limit(1)
    .transacting(trx)

  return _.get(ret, '0.id')
}




exports.isUsernameAvailable = async function (username) {
  username = username.toLowerCase()

  const ret = await this._db()
    .table('username')
    .select('id')
    .where('username', username)
    .limit(1)

  return !ret.length
}





exports.getUserByEmail = async function (email) {
  email = email.toLowerCase()

  const subquery = this._db().table('username').select('userId').where('email', email)

  return this._getUser({
    modifier: q => q.where(function () {
      this.where('user.email', email).orWhereIn('user.id', subquery)
    })
  })
}




exports.getUserById = async function (id) {
  return this._getUser({
    modifier: q => q.where('user.id', id)
  })
}



exports.getUserByUsername = async function (username) {
  username = username.toLowerCase()

  const subquery = this._db().table('username').select('userId').where('username', username)

  return this._getUser({
    modifier: q => q.whereIn('user.id', subquery)
  })
}


exports.saveUserLogin = async function ({ email, loginToken, chosenPlan, chosenSchedule }) {
  return this._dbTrans(async trx => {
    // create or fetch user id
    const id = await this._createUserOrFetchExisting({ email, chosenPlan, chosenSchedule }, trx)

    await this._db()
      .table('login')
      .insert({
        user_id: id,
        token: loginToken,
      })
      .transacting(trx)

    return id
  })
}



exports.finalizeSignUp = async function (userId, username) {
  username = username.toLowerCase()

  await this._dbTrans(async trx => {
    const legalIds = await this._getLegalIds(trx)

    const [ { email } ] = await this._db().table('user')
      .select('email')
      .where({ id: userId })
      .limit(1)
      .transacting(trx)

    await this._db().table('username')
      .insert({ userId, username, email })
      .transacting(trx)

    await this._db().table('user_legal')
      .insert({ userId, legalId: legalIds.TERMS_AND_CONDITIONS })
      .transacting(trx)

    await this._db().table('user_legal')
      .insert({ userId, legalId: legalIds.PRIVACY_POLICY })
      .transacting(trx)

    await this._db().table('user_legal')
      .insert({ userId, legalId: legalIds.MARKETING_EMAILS })
      .transacting(trx)

    // if it's not a paid plan then set to active straightaway
    await this._db().table('sub')
      .update({
        status: SUB.STATUS.ACTIVE,
      })
      .where({
        plan: SUB.PLAN.BASIC,
        userId,
      })
      .transacting(trx)
  })
}




exports.prepareNewSubscription = async function (
  userId,
  { plan, schedule }
) {
  return this._dbTrans(async trx => {
    // cancel current sub
    await this._db().table('sub')
      .update({ status: SUB.STATUS.CANCELLED })
      .where({ userId })
      .orderBy('created_at', 'desc')
      .limit(1)
      .transacting(trx)

    // creat new one
    const ret = await this._db().table('sub')
      .insert({
        userId,
        plan,
        schedule,
        status: (plan === SUB.PLAN.BASIC ? SUB.STATUS.ACTIVE : SUB.STATUS.SELECTED),
      })
      .returning('id')
      .transacting(trx)

    const [ id ] = this._extractReturnedDbIds(ret)

    const rows = await this._db().table('sub')
      .select('*')
      .where('id', id)
      .limit(1)
      .transacting(trx)

    return rows[0]
  })
}



exports.recordPaymentSucceeded = async function (subId, {
  plan, schedule, amount, nextPaymentDate, nextPaymentAmount, paddleCheckoutId, paddleSubId,
}) {
  await this._db().table('sub')
    .update({
      plan,
      schedule,
      status: SUB.STATUS.ACTIVE,
      nextPaymentDate,
      nextPaymentAmount,
      paddleSubId,
      paddleCheckoutId,
    })
    .where('id', subId)
    .limit(1)

  await this._db().table('payment')
    .insert({
      subId,
      amount,
      status: SUB.PAYMENT_STATUS.PAID,
    })
    .limit(1)
}



exports.recordPaymentFailed = async function (subId, {
  plan, schedule, amount, nextPaymentDate, paddleCheckoutId, paddleSubId,
}) {
  await this._db().table('sub')
    .update({
      plan,
      schedule,
      status: SUB.STATUS.PAYMENT_FAILED,
      nextPaymentDate,
      paddleSubId,
      paddleCheckoutId,
    })
    .where('id', subId)
    .limit(1)

  await this._db().table('payment')
    .insert({
      subId,
      amount,
      status: SUB.PAYMENT_STATUS.FAILED,
    })
    .limit(1)
}



exports.cancelSubscription = async function (subId) {
  await this._db().table('sub')
    .update({
      status: SUB.STATUS.CANCELLED,
    })
    .where('id', subId)
    .limit(1)
}



exports.deleteUser = async function (userId) {
  /*
   * For accounting purposes we may need to keep hold off subscription / payment data.
   * So we won't remove the user id entirely, we'll just scrub all sensitive and non-essential data
   */
  await this._dbTrans(async trx => {
    // delete login tokens
    await this._db().table('login')
      .delete()
      .where({ userId })
      .transacting(trx)

    // delete masks
    await this._db().table('mask')
      .delete()
      .whereIn('usernameId', function () {
        this.select('id').from('username').where({ userId })
      })
      .transacting(trx)

    // delete usernames
    await this._db().table('username')
      .delete()
      .where({ userId })
      .transacting(trx)

    // finally, update the user table
    const newEmail = `deleted-${userId}`

    await this._db().table('user')
      .update({
        email: newEmail,
        deleted: true,
      })
      .where('id', userId)
      .transacting(trx)
  })
}
