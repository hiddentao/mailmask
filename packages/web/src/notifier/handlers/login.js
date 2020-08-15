import { randStr } from '@mailmask/utils'

import { LOGIN } from '../types'

export function render ({ code, validTo }) {
  return {
    subject: `Please enter the code ${code} to finish logging in`,
    body: `Hi 👋,

Please enter the code ${code} on the webpage to finish logging in to Mailmask.

(Note that this code will be only be valid until ${validTo}).

thanks,
The Mailmask team
`
  }
}

export function getTokenDecodeErrorMessage () { return 'Please try logging in again' }

export async function handlePayload ({ setSessionUser, redirectTo }, { email, loginToken }) {
  // record the login
  const id = await this._db.saveUserLogin({ email, loginToken })

  // set auth cookie
  await setSessionUser({ id })
  await redirectTo('/logged-in')
}

export async function sendNotification ({ email }) {
  const loginToken = randStr(8)

  return this._sendEmail(email, LOGIN, { email, loginToken })
}
