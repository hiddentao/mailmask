exports.schema = knex => knex.schema.withSchema('public')

exports.addTimestampColumns = (knex, table) => {
  table.timestamps(false, true)
}


