import { obfuscate, randStr } from '@mailmask/utils'

import { buildUrlPath } from '../../utils/url'
import { LOGIN } from '../types'

export function render ({ url, urlValidTo }) {
  return {
    subject: 'Please follow the link to login',
    body: `Hi,

Please follow the link below to login:

${url}

(This link will be valid until ${urlValidTo})

thanks,
The Mailmask team
`
  }
}

export async function handleLink ({ span, res }, v) {
  const { email, loginToken } = await this._decodePayload(v, {
    retryMsg: 'Please try logging in again.'
  })

  // record the login
  const id = await span.withAsyncSpan(
    'save login to db',
    { email: obfuscate(email) },
    () => this._db.saveUserLogin(email, loginToken)
  )

  // set auth cookie
  await res.setUser({ id })

  res.status(302)
  res.setHeader('Location', buildUrlPath('/logged-in'))
  res.end('Redirection to logged-in page')
}

export async function sendNotification ({ email }) {
  const loginToken = randStr(8)

  return this._sendEmail(email, LOGIN, { email, loginToken })
}
