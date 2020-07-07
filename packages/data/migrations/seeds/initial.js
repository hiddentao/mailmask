/* eslint-disable camelcase */
const { formatISO, SUB } = require('@mailmask/utils')


exports.seed = async knex => {
  await knex('user').del()

  const [ user1Id, user2Id, user3Id ] = await knex('user')
    .insert([
      { email: 'mailmask1@hiddentao.com' },
      { email: 'mailmask2@hiddentao.com' },
      { email: 'mailmask3@hiddentao.com' },
    ])
    .returning('id')

  const nextPaymentDate = formatISO(new Date(2040, 1, 1))

  await knex('sub')
    .insert([
      { user_id: user1Id, plan: SUB.PLAN.BASIC, schedule: SUB.SCHEDULE.MONTHLY, status: SUB.STATUS.ACTIVE, next_payment_date: nextPaymentDate },
      { user_id: user2Id, plan: SUB.PLAN.BASIC, schedule: SUB.SCHEDULE.MONTHLY, status: SUB.STATUS.ACTIVE, next_payment_date: nextPaymentDate },
      { user_id: user3Id, plan: SUB.PLAN.BASIC, schedule: SUB.SCHEDULE.MONTHLY, status: SUB.STATUS.SELECTED, next_payment_date: nextPaymentDate },
    ])
    .returning('id')

  const [ user1_usernameId, user2_usernameId, user3_usernameId ] = await knex('username')
    .insert([
      { user_id: user1Id, username: 'test', email: 'mailmask1@hiddentao.com' },
      { user_id: user2Id, username: 'test2', email: 'mailmask2@hiddentao.com' },
      { user_id: user3Id, username: 'test3', email: 'mailmask3@hiddentao.com' },
    ])
    .returning('id')

  await knex('mask')
    .insert([
      { username_id: user1_usernameId, name: 'mask1', enabled: false },
      { username_id: user1_usernameId, name: 'mask2', enabled: true },
      { username_id: user2_usernameId, name: 'mask2', enabled: true },
      { username_id: user3_usernameId, name: 'mask1', enabled: false },
      { username_id: user3_usernameId, name: 'mask2', enabled: true },
    ])
}
