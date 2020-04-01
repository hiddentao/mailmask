const _ = require('lodash')

// eslint-disable-next-line func-names
exports._extractUserFromResultRow = function (row) {
  return {
    id: row.uId,
    username: row.uUsername,
    email: row.uEmail,
    email_confirmed: row.uEmailConfirmed,
  }
}


// eslint-disable-next-line func-names
exports.getUsersByUsernames = async function (usernames) {
  this._log.debug(`Get users by usernames (${usernames.length}) ...`)

  const sanitizedUsernames = usernames.map(u => u.toLowerCase())

  const ret = await this._db()
    .table('user')
    .select('*')
    .whereIn('username', sanitizedUsernames)
    .andWhere('email_confirmed', '=', 1)

  return ret
}
