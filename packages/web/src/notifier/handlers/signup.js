import { obfuscate, randStr } from '@mailmask/utils'

import { SIGNUP } from '../types'

export function render ({ code, url, urlValidTo }) {
  return {
    subject: 'Please follow the link to finish signing up',
    body: `Hi,

Please enter the code ${code} on the webpage, or follow the link below to finish signing up for Mailmask:

${url}

(This link will be valid until ${urlValidTo})

thanks,
Ram @ Mailmask
`
  }
}

export function getTokenDecodeErrorMessage () { return 'Please try signing up again' }

export async function handlePayload (
  { setSessionUser, redirectTo },
  { email, plan, schedule, loginToken }
) {
  // record the login
  const id = await this._db.saveUserLogin({ email, loginToken, chosenPlan: plan, chosenSchedule: schedule })

  // set auth cookie
  await setSessionUser({ id })
  await redirectTo('/logged-in')
}

export async function sendNotification ({ email, plan }) {
  const loginToken = randStr(8)

  return this._sendEmail(email, SIGNUP, { email, plan, loginToken })
}
