import { obfuscate, randStr } from '@mailmask/utils'

import { buildUrlPath } from '../../utils/url'
import { SIGNUP } from '../types'

export function render ({ url, urlValidTo }) {
  return {
    subject: 'Please follow the link to finish signing up',
    body: `Hi,

Please follow the link below to finish signing up:

${url}

(This link will be valid until ${urlValidTo})

thanks,
The Mailmask team
`
  }
}

export async function handleLink ({ span, res }, v) {
  const { email, plan, schedule, loginToken } = await this._decodePayload(v, {
    retryMsg: 'Please try signing up again.'
  })

  // record the login
  const id = await span.withAsyncSpan(
    'save new sign up to db',
    { email: obfuscate(email) },
    () => this._db.saveUserLogin({ email, loginToken, chosenPlan: plan, chosenSchedule: schedule })
  )

  // set auth cookie
  await res.setUser({ id })

  res.status(302)
  res.setHeader('Location', buildUrlPath('/logged-in'))
  res.end('Redirection to logged-in page')
}

export async function sendNotification ({ email, plan }) {
  const loginToken = randStr(8)

  return this._sendEmail(email, SIGNUP, { email, plan, loginToken })
}
