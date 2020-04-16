import { buildBackendUrl } from '../../utils/url'
import { SIGNED_UP } from '../types'

export function render ({ username, dashboardUrl }) {
  return {
    subject: 'Congratulations! your MaskMail account is now ready',
    body: `Hi ${username},

You have successfully signed up for MailMask.

You can now manage all your masks via your dashboard:

${dashboardUrl}

thanks,
MailMask team
`
  }
}

export async function sendNotification ({ email, username }) {
  return this._sendEmail(email, SIGNED_UP, {}, {
    username,
    dashboardUrl: buildBackendUrl('/dashboard'),
  })
}
