/* eslint-disable func-names */
const { addDays, formatISO, SUB } = require('@mailmask/utils')

const { addTimestampColumns, schema } = require('./utils')

exports.up = async function (knex) {
  // create separate usernames table
  await schema(knex).createTable('username', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable().unique() /* only one subscription per account */
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    addTimestampColumns(knex, table)
    table.foreign('user_id').references('user.id').onUpdate('RESTRICT').onDelete('RESTRICT')
  })

  // copy existing usernames into new table
  let { rows } = await schema(knex).raw('select id, username, email from public."user"')
  await Promise.all(rows.map(async row => {
    await knex.raw(`INSERT INTO public.username (user_id, username, email) VALUES (?, ?, ?)`, [
      row.id, row.username, row.email,
    ])
  }))

  // remove username from user table
  await schema(knex).table('user', table => {
    table.dropColumn('signed_up')
    table.dropColumn('username')
    table.boolean('deleted').notNullable().defaultTo(false)
  })

  // add username_id column to mask table
  await schema(knex).table('mask', table => {
    table.uuid('username_id').nullable() /* temporarily nullable */
    table.foreign('username_id').references('username.id').onUpdate('RESTRICT').onDelete('RESTRICT')
  })
  // map masks to username table
  ;({ rows } = await schema(knex).raw('select id, user_id, username from username'))
  await Promise.all(rows.map(async row => {
    await knex.raw(`UPDATE mask SET username_id = ? WHERE user_id = ?`, [
      row.id, row.user_id,
    ])
  }))
  // now remove user_id from mask and make username_id not nullable
  await schema(knex).table('mask', table => {
    table.dropColumn('user_id')
    table.uuid('username_id').notNullable().alter()
    table.unique([ 'username_id', 'name' ])
  })

  // create mask statistics table
  await schema(knex).createTable('stats', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('mask_id').notNullable()
    table.string('period', 7).notNullable()
    table.integer('num_bytes').notNullable().defaultTo(0)
    table.integer('num_messages').notNullable().defaultTo(0)
    table.timestamp('last_received').notNullable()
    addTimestampColumns(knex, table)
    table.unique([ 'mask_id', 'period' ])
    table.foreign('mask_id').references('mask.id').onUpdate('CASCADE').onDelete('CASCADE')
  })

  // create subscriptions table
  await schema(knex).createTable('sub', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('user_id').notNullable()
    table.string('plan', 32).notNullable()
    table.string('schedule', 32).notNullable()
    table.string('status', 32).notNullable()
    table.timestamp('next_payment_date').nullable()
    table.string('next_payment_amount').nullable()
    table.string('paddle_sub_id').nullable()
    table.string('paddle_checkout_id').nullable()
    addTimestampColumns(knex, table)
    table.foreign('user_id').references('user.id').onUpdate('RESTRICT').onDelete('RESTRICT')
  })

  // give everyone a BASIC subscription
  ;({ rows } = await schema(knex).raw('select id, created_at from public."user"'))
  await Promise.all(rows.map(async row => {
    await knex.raw(`INSERT INTO public.sub (user_id, plan, status, expires) VALUES (?, ?, ?, ?)`, [
      row.id, SUB.PLAN.BASIC, SUB.STATUS.ACTIVE, formatISO(addDays(row.created_at, 30))
    ])
  }))

  // create payments table
  await schema(knex).createTable('payment', table => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('sub_id').notNullable()
    table.string('amount').notNullable()
    table.string('status').notNullable()
    addTimestampColumns(knex, table)
    table.foreign('sub_id').references('sub.id').onUpdate('RESTRICT').onDelete('RESTRICT')
  })
}

exports.down = async function (knex) {
  await schema(knex).table('mask', table => {
    table.dropForeign('username_id')
    table.dropColumn('username_id')
  })

  await schema(knex).dropTableIfExists('stats')
  await schema(knex).dropTableIfExists('username')
  await schema(knex).dropTableIfExists('payment')
  await schema(knex).dropTableIfExists('sub')
}
