const schema = knex => knex.schema.withSchema('public')
exports.schema = schema

exports.addTimestampColumns = (knex, table) => {
  table.timestamps(false, true)
}