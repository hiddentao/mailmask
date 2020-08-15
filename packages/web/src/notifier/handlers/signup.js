import { randStr } from '@mailmask/utils'

import { SIGNUP } from '../types'

export function render ({ code, validTo }) {
  return {
    subject: `Please enter the code ${code} to finish signing up`,
    body: `Hi 👋,

Please enter the code ${code} on the webpage to finish signing up for Mailmask.

(Note that this code will be only be valid until ${validTo}).

thanks,
The Mailmask team
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
