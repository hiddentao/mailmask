/* eslint-disable func-names */
const { _ } = require('@mailmask/utils')

const { LEGAL } = require('./constants')

exports._createUserOrFetchExisting = async function (email, trx) {
  email = email.toLowerCase()

  let ret = await this._db().table('user')
    .select()
    .where({ email })
    .limit(1)
    .transacting(trx)

  let id = _.get(ret, '0.id')

  if (!id) {
    ret = await this._db().table('user')
      .insert({
        email,
        // since username has not yet been set by user we just use their email address for now
        username: email
      })
      .returning('id')
      .transacting(trx)

    ;([ id ] = this._extractReturnedDbIds(ret))
  }

  return id
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
    .table('user')
    .select('id')
    .where('username', username)
    .limit(1)

  return !ret.length
}





exports.getUserByEmail = async function (email) {
  email = email.toLowerCase()

  const ret = await this._db()
    .table('user')
    .select('*')
    .where('email', email.toLowerCase())
    .limit(1)

  return ret.length ? ret[0] : null
}




exports.getUserById = async function (id) {
  const ret = await this._db()
    .table('user')
    .select('*')
    .where('id', id)
    .limit(1)

  return ret.length ? ret[0] : null
}



exports.getUserByUsername = async function (username) {
  username = username.toLowerCase()

  const ret = await this._db()
    .table('user')
    .select('*')
    .where('username', username)
    .limit(1)

  return ret.length ? ret[0] : null
}


exports.saveUserLogin = async function (email, token) {
  // transaction
  return this._dbTrans(async trx => {
    // create or fetch user id
    const id = await this._createUserOrFetchExisting(email, trx)

    await this._db()
      .table('login')
      .insert({
        user_id: id,
        token,
      })
      .transacting(trx)

    return id
  })
}



exports.finalizeSignUp = async function (userId, username) {
  username = username.toLowerCase()

  await this._dbTrans(async trx => {
    await this._db()
      .table('user')
      .update({
        username,
        signedUp: true,
      })
      .where('id', userId)
      .transacting(trx)

    const legalIds = await this._getLegalIds(trx)

    await this._db().table('user_legal')
      .insert({ userId, legalId: legalIds.TERMS_AND_CONDITIONS })
      .transacting(trx)

    await this._db().table('user_legal')
      .insert({ userId, legalId: legalIds.PRIVACY_POLICY })
      .transacting(trx)

    await this._db().table('user_legal')
      .insert({ userId, legalId: legalIds.MARKETING_EMAILS })
      .transacting(trx)
  })
}




exports.deleteUser = async function (userId) {
  await this._dbTrans(async trx => {
    await this._db().raw(`delete from user_legal where user_id = ?`, [ userId ]).transacting(trx)
    await this._db().raw(`delete from login where user_id = ?`, [ userId ]).transacting(trx)
    await this._db().raw(`delete from mask where user_id = ?`, [ userId ]).transacting(trx)
    await this._db().raw(`delete from "user" where id = ?`, [ userId ]).transacting(trx)
  })
}
