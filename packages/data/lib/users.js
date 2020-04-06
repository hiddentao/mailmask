/* eslint-disable func-names */
const { _, obfuscate } = require('@camomail/utils')

exports._extractUserFromResultRow = function (row) {
  return {
    id: row.uId,
    username: row.uUsername,
    email: row.uEmail,
    createdAt: row.uCreatedAt,
  }
}


exports._createUserOrFetchExisting = async function (email, trx) {
  email = email.toLowerCase()

  let ret = await this._db().table('user')
    .select()
    .where({ email })
    .limit(1)
    .transacting(trx)

  let id = _.get(ret, '0.id')

  if (!id) {
    this._log.debug(`Create user: ${obfuscate(email)}`)

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



exports.getUserByEmail = async function (email) {
  this._log.debug(`Get user by email (${obfuscate(email)}) ...`)

  email = email.toLowerCase()

  const ret = await this._db()
    .table('user')
    .select('*')
    .where('email', email.toLowerCase())
    .limit(1)

  return ret.length ? ret[0] : null
}




exports.getUserById = async function (id) {
  this._log.debug(`Get user by id (${id}) ...`)

  const ret = await this._db()
    .table('user')
    .select('*')
    .where('id', id)
    .limit(1)

  return ret.length ? ret[0] : null
}



exports.getUserByUsername = async function (username) {
  this._log.debug(`Get user by username (${username}) ...`)

  username = username.toLowerCase()

  const ret = await this._db()
    .table('user')
    .select('*')
    .where('username', username)
    .limit(1)

  return ret.length ? ret[0] : null
}


exports.saveUserLogin = async function (email, token) {
  this._log.debug(`Record user as logged-in (${obfuscate(email)}, token: ${token}) ...`)

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


exports.updateUserPrefixCounts = async function (userPrefixesMap) {
  this._log.debug(`Update user prefixes counts (${Object.keys(userPrefixesMap).length} users) ...`)

  // transaction
  return this._dbTrans(async trx => {
    await Promise.all()
    // create or fetch user id
    const id = await this._createUserOrFetchExisting(email, trx)

    await this._db().raw(`
      INSERT INTO mask (user_id, name, enabled)
      VALUES ()
    `)
      .table('login')
      .insert({
        user_id: id,
        token,
      })
      .transacting(trx)

    return id
  })
}