exports.seed = async knex => {
  await knex('user').del()

  const [ user1Id, user2Id ] = await knex('user')
    .insert([
      { username: 'test', email: 'camomail1@hiddentao.com', signed_up: true },
      { username: 'test2', email: 'camomail2@hiddentao.com', signed_up: true },
      { username: 'test3', email: 'camomail3@hiddentao.com', signed_up: false },
    ])
    .returning('id')

  await knex('mask')
    .insert([
      { user_id: user1Id, name: 'camo1', enabled: false },
      { user_id: user1Id, name: 'camo2', enabled: true },
      { user_id: user2Id, name: 'camo2', enabled: true },
    ])
}
