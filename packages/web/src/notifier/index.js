import url from 'url'
import Mailer from '@mailmask/mailgun'
import { obfuscate, formatDate, generateVerificationCode } from '@mailmask/utils'
import { encrypt, decrypt } from '@mailmask/nodejs-utils'

import TYPES from './types'
import { buildBackendUrl } from '../utils/url'

const TYPE_TOKEN_SEPERATOR = '_'

class Notifier {
  constructor ({ config, sendGridApi, db }) {
    this._sendGridApi = sendGridApi

    this._cryptoParams = {
      key: config.ENCRYPTION_KEY,
      iv: config.ENCRYPTION_IV,
    }

    this._domain = config.DOMAIN
    this._senderEmail = config.SUPPORT_EMAIL

    this._mailer = new Mailer({
      apiKey: config.MAILER_API_KEY,
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

  async handleVerification (ctx, { token, code }) {
    const sepPos = token.indexOf(TYPE_TOKEN_SEPERATOR)
    const type = token.substr(0, sepPos)
    token = token.substr(sepPos + 1)

    const handler = this._getHandler(type)
    const retryMsg = handler.getTokenDecodeErrorMessage()

    const { code: realCode, ...payload } = await this._decodePayload(token, { retryMsg })

    if (realCode !== code) {
      throw new Error(`Invalid code.`)
    }

    return handler.handlePayload.call(this, { ...ctx }, payload)
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

  async _sendEmail (
    email,
    type,
    payload = {},
    templateVars = {}
  ) {
    const includeVerificationCode = !!Object.keys(payload).length

    if (includeVerificationCode) {
      payload.code = generateVerificationCode(4)
    }

    const { token: rawToken, expires } = await this._encodePayload(payload)

    const token = `${type}${TYPE_TOKEN_SEPERATOR}${rawToken}`

    const urlPath = url.format({
      pathname: `/api/verify`,
      query: {
        v: token,
        ...(includeVerificationCode ? { code: payload.code } : {})
      }
    })

    const absUrl = buildBackendUrl(urlPath)

    const { subject, body: text } = this._handlers[type].render({
      url: absUrl,
      urlValidTo: formatDate(expires, 'PPppp'),
      code: payload.code,
      ...templateVars
    })

    try {
      const msg = {
        from: `Mailmask <${this._senderEmail}>`,
        to: [ email ],
        subject,
        text,
      }

      await this._mailer.send(msg)

      // return token to caller
      return token
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

  async _decodePayload (v, { retryMsg }) {
    let expires
    let params

    try {
      ({ expires, params } = await decrypt(v, this._cryptoParams))
    } catch (err) {
      throw new Error(
        `Uh oh! looks like this link is invalid. ${retryMsg}.`
      )
    }

    if (expires <= Date.now()) {
      throw new Error(
        `Oh dear, this link has already expired. ${retryMsg}.`
      )
    }

    return params
  }
}

export const createNotifier = cfg => new Notifier(cfg)
