const { _ } = require('@mailmask/utils')
const knex = require('knex')
const knexHooks = require('knex-hooks')

const { tsStr } = require('./utils')
const { getConfig: getDbConfig } = require('../knexfile')
const userMethods = require('./users')
const maskMethods = require('./masks')

const mapKeyMapper = (_ignore, key) => _.camelCase(key)

class Db {
  constructor ({ config }) {
    const env = config.APP_MODE

    const knexConfig = getDbConfig({ env, config })

    if (!knexConfig) {
      throw new Error(`Invalid db env: ${env}`)
    }

    this._knex = knex({
      ...knexConfig,
      postProcessResponse: this._postProcessDbResponse.bind(this),
      wrapIdentifier: this._wrapDbIdentifier.bind(this)
    })

    ;[ userMethods, maskMethods ].forEach(methods => {
      Object.entries(methods).forEach(([ methodName, fn ]) => {
        this[methodName] = fn.bind(this)
      })
    })

    knexHooks(this._knex)

    // update the "updated_at" in all update queries
    this._knex.addHook('before', 'update', '*', (_ignore, __ignore, ___ignore, params) => {
      const updateData = knexHooks.helpers.getUpdateData(params.query)
      updateData.updated_at = tsStr()
    })
  }

  async shutdown () {
    await this._knex.destroy()
  }

  _db () {
    return this._knex
  }

  async _dbTrans (cb) {
    // this._log.debug('BEGIN TRANSACTION ...')

    return this._db().transaction(async trx => {
      try {
        const result = await cb(trx)
        // this._log.debug('... COMMIT :)')
        await trx.commit(result)
      } catch (err) {
        // this._log.warn(err)
        // this._log.debug('... ROLLBACK :/')
        await trx.rollback(err)
      }
    })
  }

  _extractPrefixedValues (row, prefix, keys) {
    return keys.reduce((m, v) => {
      m[v] = row[`${prefix}${v.charAt(0).toUpperCase()}${v.substr(1)}`]
      return m
    }, {})
  }

  _extractReturnedDbIds (rows) {
    return rows.map(r => Object.values(r).join(''))
  }

  _postProcessDbResponse (result) {
    if (Array.isArray(result) || Array.isArray(result.rows)) {
      return (result.rows || result).map(row => (
        _.mapValues(_.mapKeys(row, mapKeyMapper), o => (
          (o instanceof Date) ? o.toISOString() : o
        ))
      ))
    }

    return result
  }

  _wrapDbIdentifier (value, origImpl) {
    return origImpl('*' === value ? '*' : _.snakeCase(value))
  }
}

exports.create = ({ config }) => new Db({ config })
