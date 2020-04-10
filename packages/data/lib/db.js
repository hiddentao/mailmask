const { _ } = require('@camomail/utils')
const knex = require('knex')

const getKnexConfig = require('../knexfile')
const userMethods = require('./users')
const maskMethods = require('./masks')

const mapKeyMapper = (_ignore, key) => _.camelCase(key)

class Db {
  constructor ({ config }) {
    const env = config.APP_MODE

    const knexConfig = getKnexConfig({ env, config })

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
  }

  async shutdown () {
    await this._knex.destroy()
  }

  tsStr () {
    return new Date().toISOString()
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
