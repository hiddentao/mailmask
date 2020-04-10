import { obfuscate, randStr } from '@camomail/utils'

import { buildUrlPath } from '../../utils/url'
import { LOGIN } from '../types'

export function render ({ url }) {
  return {
    subject: 'Please follow the link to login',
    body: `Hi,

Please follow the link below to login:

${url}

thanks,

Team MailMask
`
  }
}

export async function handleLink ({ span, res }, v) {
  const { email, loginToken } = await this._decodePayload(v)

  // record the login
  const id = await span.withAsyncSpan(
    'save login to db',
    { email: obfuscate(email) },
    () => this._db.saveUserLogin(email, loginToken)
  )

  // set auth cookie
  res.setUser({ id })

  res.status(302)
  res.setHeader('Location', buildUrlPath('/logged-in'))
  res.end('Redirection to logged-in page')
}

export async function sendNotification ({ email }) {
  const loginToken = randStr(8)

  return this._sendEmail(email, LOGIN, { email, loginToken })
}
