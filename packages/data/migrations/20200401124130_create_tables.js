/* eslint-disable func-names */
const { addTimestampColumns, schema } = require('./utils')
const { LEGAL } = require('../lib/constants')

exports.up = async function (knex) {
  await knex.raw('create extension if not exists "uuid-ossp"')

  await schema(knex).createTable('legal', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('type', 32).notNullable()
    table.integer('version').unsigned()
    addTimestampColumns(knex, table)
  })

  // default legal values
  await knex.table('legal').insert([
    { type: LEGAL.TERMS_AND_CONDITIONS, version: 1 },
    { type: LEGAL.PRIVACY_POLICY, version: 1 },
    { type: LEGAL.MARKETING_EMAILS, version: 1 },
  ])

  await schema(knex).createTable('user', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.boolean('signed_up').notNullable().defaultTo(false)
    addTimestampColumns(knex, table)
  })

  await schema(knex).createTable('user_legal', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.uuid('legal_id').notNullable()
    addTimestampColumns(knex, table)
    table.unique([ 'user_id', 'legal_id' ])
    table.foreign('user_id').references('user.id').onUpdate('RESTRICT').onDelete('CASCADE')
    table.foreign('legal_id').references('legal.id').onUpdate('RESTRICT').onDelete('RESTRICT')
  })

  await schema(knex).createTable('login', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.string('token').notNullable()
    addTimestampColumns(knex, table)
    table.foreign('user_id').references('user.id').onUpdate('RESTRICT').onDelete('CASCADE')
  })

  await schema(knex).createTable('mask', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.string('name').notNullable()
    table.boolean('enabled').notNullable().defaultTo(false)
    addTimestampColumns(knex, table)
    table.unique([ 'user_id', 'name' ], 'unique_mask')
    table.foreign('user_id').references('user.id').onUpdate('RESTRICT').onDelete('RESTRICT')
  })
}

exports.down = async function (knex) {
  await schema(knex).dropTableIfExists('mask')
  await schema(knex).dropTableIfExists('login')
  await schema(knex).dropTableIfExists('user_legal')
  await schema(knex).dropTableIfExists('user')
  await schema(knex).dropTableIfExists('legal')

  await knex.raw('drop extension if exists "uuid-ossp"')
}
