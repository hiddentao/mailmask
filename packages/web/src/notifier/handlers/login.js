import { obfuscate, randStr } from '@mailmask/utils'

import { LOGIN } from '../types'

export function render ({ code, url, urlValidTo }) {
  return {
    subject: 'Please follow the link to login',
    body: `Hi there,

Please enter the code ${code} on the webpage, or follow the link below to finish logging in to Mailmask:

${url}

(Note that this link will be only be valid until ${urlValidTo})

thanks,
Ram @ Mailmask
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
