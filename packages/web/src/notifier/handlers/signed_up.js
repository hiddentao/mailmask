import { buildMaskAddress } from '@mailmask/utils'

import { buildBackendUrl } from '../../utils/url'
import { SIGNED_UP } from '../types'

export function render ({ username, maskEmailAddress, dashboardUrl }) {
  return {
    subject: 'Congratulations! your MaskMail account is now ready',
    body: `Hi ${username},

You have successfully signed up for MailMask.

We sent this email to ${maskEmailAddress} to demonstrate MailMask in action! You can turn this mask off via your dashboard:

${dashboardUrl}

thanks,
MailMask team
`
  }
}

export async function sendNotification ({ username }) {
  const maskEmailAddress = buildMaskAddress('test', username, this._domain)

  return this._sendEmail(maskEmailAddress, SIGNED_UP, {}, {
    username,
    maskEmailAddress,
    dashboardUrl: buildBackendUrl('/dashboard'),
  })
}
