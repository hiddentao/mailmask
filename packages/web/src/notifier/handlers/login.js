import { obfuscate } from '../../utils/string'
import { buildUrlPath } from '../../utils/url'
import { LOGIN } from '../types'

export function render ({ url }) {
  return {
    subject: 'Please follow the link to login',
    body: `Hi,

Please follow the link below to login:

${url}

thanks,

The friendly solUI bot
`
  }
}

export async function handleLink ({ res }, v) {
  const { email, loginToken } = await this._decodePayload(v)

  await this._db.saveLoginToken({ email, loginToken })

  res.status(302)
  res.setHeader('Location', buildUrlPath('/logged-in'))
  res.end('Redirection to logged-in page')
}

export async function sendNotification ({ email, loginToken }) {
  this._log.info(`Sending login email to ${obfuscate(email)}`)

  return this._sendEmail(email, LOGIN, { email, loginToken })
}
