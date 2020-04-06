import url from 'url'
import Mailgun from '@camomail/mailgun'
import { obfuscate } from '@camomail/utils'

import { LOGIN } from './types'
import { encrypt, decrypt } from '../utils/crypto'
import { buildBackendUrl } from '../utils/url'

class Notifier {
  constructor ({ config, log, db }) {
    this._log = log.create('notifier')

    this._cryptoParams = {
      key: config.ENCRYPTION_KEY,
      iv: config.ENCRYPTION_IV,
    }

    this._domain = config.DOMAIN

    this._mg = new Mailgun({
      apiKey: config.MAILGUN_API_KEY,
      domain: this._domain,
      testMode: !!config.TESTMODE,
    })

    this._db = db

    this.TYPES = {
      LOGIN
    }

    this._handlers = Object.keys(this.TYPES).reduce((m, t) => {
      /* eslint-disable import/no-dynamic-require */
      m[t] = require(`./handlers/${t.toLowerCase()}`)
      /* eslint-enable import/no-dynamic-require */
      return m
    }, {})
  }

  _getHandler (type) {
    if (!this._handlers[type]) {
      throw new Error('Unrecognized notification type')
    }

    return this._handlers[type]
  }

  async handleLink ({ req, res }) {
    const { type, v } = req.query

    return this._getHandler(type).handleLink.call(this, { req, res }, v)
  }

  async sendNotification (type, params) {
    return this._getHandler(type).sendNotification.call(this, params)
  }


  async sendNotificationFromEvent (type, params) {
    try {
      this._getHandler(type).sendNotification.call(this, params)
    } catch (err) {
      /* silently fail as error has already been output */
    }
  }

  async _sendEmail (email, type, payload, templateVars = {}) {
    const urlPath = url.format({
      pathname: `/api/verify/${type}`,
      query: {
        v: await this._encodePayload(payload)
      }
    })

    const absUrl = buildBackendUrl(urlPath)

    const { subject, body: text } = this._handlers[type].render({
      url: absUrl,
      ...templateVars
    })

    try {
      this._log.debug(`Sending email to ${obfuscate(email)} ...`)

      const msg = {
        from: `Camomail <support@${this._domain}>`,
        to: [ email ],
        subject,
        text,
      }

      await this._mg.send(msg)

      this._log.debug(`... email sent`)
    } catch (err) {
      const errStr = `Error sending email to ${obfuscate(email)}: ${err.message}`
      this._log.error(errStr, err)
      throw new Error(errStr)
    }
  }

  async _encodePayload (params) {
    return encrypt({ expires: Date.now() + /* 1 hour */ 3600000, params }, this._cryptoParams)
  }

  async _decodePayload (v) {
    const { expires, params } = await decrypt(v, this._cryptoParams)

    if (expires <= Date.now()) {
      throw new Error('Sorry, the link you tried has already expired.')
    }

    return params
  }
}

export const createNotifier = cfg => new Notifier(cfg)
