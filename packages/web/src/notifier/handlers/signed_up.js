import { buildMaskAddress } from '@mailmask/utils'

import { buildBackendUrl } from '../../utils/url'
import { SIGNED_UP } from '../types'

export function render ({ username, maskEmailAddress, dashboardUrl }) {
  return {
    subject: 'Congratulations! your Mailmask account is now ready',
    body: `Hi ${username} 👋,

Thank you for signing up to Mailmask.

We sent this email to ${maskEmailAddress} to demonstrate Mailmask in action! You can turn this alias off via your dashboard:

${dashboardUrl}

If you have any feedback for us or any questions you can reach out to us by:

- Webchat: https://msk.sh/help
- Email: hello@msk.sh
- Twitter: @mskhq

You can support us by:

- Upgrading to the Premium plan
- Telling a friend about Mailmask

Thanks again for trying out Mailmask!

thanks,
Ram @ Mailmask
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
