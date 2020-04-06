/* eslint-disable func-names */

exports.getMaskStatuses = async function (username, masks) {
  this._log.debug(`Get status for given masks for given user ...`)

  return this._db()
    .table('mask')
    .column('name', 'enabled')
    .innerJoin('user', 'user.id', 'mask.user_id')
    .whereIn('name', masks)
    .andWhere('user.username', '=', username)
    .orderBy('name', 'asc')
}



exports.saveNewMasks = async function (userId, newMasks) {
  this._log.debug(`Save ${newMasks.length} new masks for user ${userId} ...`)

  return this._db()
    .table('mask')
    .insert(newMasks.map(m => [
      { user_id: userId, name: m, enabled: true },
    ]))
    .on// TODO: on conflict do nothing!!!
}



