exports.seed = async knex => {
  await knex('user').del()

  const [ user1Id, user2Id, user3Id ] = await knex('user')
    .insert([
      { username: 'test', email: 'mailmask1@hiddentao.com', signed_up: true },
      { username: 'test2', email: 'mailmask2@hiddentao.com', signed_up: true },
      { username: 'test3', email: 'mailmask3@hiddentao.com', signed_up: false },
    ])
    .returning('id')

  await knex('mask')
    .insert([
      { user_id: user1Id, name: 'mask1', enabled: false },
      { user_id: user1Id, name: 'mask2', enabled: true },
      { user_id: user2Id, name: 'mask2', enabled: true },
      { user_id: user3Id, name: 'mask1', enabled: false },
    ])
}
