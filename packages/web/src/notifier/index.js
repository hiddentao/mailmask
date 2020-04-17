import url from 'url'
import Mailgun from '@mailmask/mailgun'
import { obfuscate, formatDate } from '@mailmask/utils'

import TYPES from './types'
import { encrypt, decrypt } from '../utils/crypto'
import { buildBackendUrl } from '../utils/url'

class Notifier {
  constructor ({ config, db }) {
    this._cryptoParams = {
      key: config.ENCRYPTION_KEY,
      iv: config.ENCRYPTION_IV,
    }

    this._domain = config.DOMAIN
    this._senderEmail = config.SUPPORT_EMAIL

    this._mg = new Mailgun({
      apiKey: config.MAILGUN_API_KEY,
      domain: this._domain,
      testMode: !!config.SMTP_TESTMODE,
    })

    this._db = db

    this.TYPES = TYPES

    this._handlers = Object.keys(TYPES).reduce((m, t) => {
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

    return req.span.withAsyncSpan(
      'notifierHandleLink', {
        notifier: true,
        type,
      },
      ({ span }) => this._getHandler(type).handleLink.call(this, { span, req, res }, v)
    )
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
    const { token, expires } = await this._encodePayload(payload)

    const urlPath = url.format({
      pathname: `/api/verify/${type}`,
      query: {
        v: token
      }
    })

    const absUrl = buildBackendUrl(urlPath)

    const { subject, body: text } = this._handlers[type].render({
      url: absUrl,
      urlValidTo: formatDate(expires, 'PPppp'),
      ...templateVars
    })

    try {
      const msg = {
        from: `MailMask <${this._senderEmail}>`,
        to: [ email ],
        subject,
        text,
      }

      await this._mg.send(msg)
    } catch (err) {
      const errStr = `Error sending email to ${obfuscate(email)}: ${err.message}`
      throw new Error(errStr)
    }
  }

  async _encodePayload (params) {
    const expires = Date.now() + /* 1 hour */ 3600000

    return {
      token: await encrypt({ expires, params }, this._cryptoParams),
      expires,
    }
  }

  async _decodePayload (v, { retryMsg = '' } = {}) {
    let expires
    let params

    try {
      ({ expires, params } = await decrypt(v, this._cryptoParams))
    } catch (err) {
      throw new Error(
        `Sorry, this link is invalid. ${retryMsg}`
      )
    }

    if (expires <= Date.now()) {
      throw new Error(
        `Sorry, this link has already expired. ${retryMsg}`
      )
    }

    return params
  }
}

export const createNotifier = cfg => new Notifier(cfg)
