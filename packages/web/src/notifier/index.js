import url from 'url'
// import mailgun from 'mailgun.js'

import { obfuscate } from '../utils/string'
import { LOGIN } from './types'
import { encrypt, decrypt } from '../utils/crypto'
import { buildBackendUrl } from '../utils/url'

class Notifier {
  constructor ({ config, log }) {
    this._log = log.create('notifier')

    this._cryptoParams = {
      key: config.ENCRYPTION_KEY,
      iv: config.ENCRYPTION_IV,
    }

    this._domain = config.MAILGUN_DOMAIN

    // this._mg = mailgun.client({
    //   username: 'api',
    //   key: config.MAILGUN_API_KEY,
    // })

    // this._db = db
    // this._db.on('notify', this.sendNotificationFromEvent.bind(this))

    this._handlers = {
      /* eslint-disable import/no-dynamic-require */
      [LOGIN]: require(`./handlers/${LOGIN}`),
      /* eslint-enable import/no-dynamic-require */
    }

    this._isSimulated = !!config.SIMULATED
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

      if (this._isSimulated) {
        this._log.info(msg)
        this._log.info('... email simulated')
      } else {
        await this._mg.messages.create(this._domain, msg)
        this._log.debug(`... email sent`)
      }
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
