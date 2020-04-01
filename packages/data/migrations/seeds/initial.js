exports.seed = async knex => {
  await knex('user').del()

  await knex('user').insert([
    { username: 'test', email: 'camomail@hiddentao.com', email_confirmed: true, },
  ])
}
