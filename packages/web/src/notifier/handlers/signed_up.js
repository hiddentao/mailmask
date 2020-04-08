import { buildCamoUrl, buildBackendUrl } from '../../utils/url'
import { SIGNED_UP } from '../types'

export function render ({ email, username, dashboardUrl }) {
  return {
    subject: 'Congratulations! your camomail account is ready to go',
    body: `Hi ${username},

You have successfully signed up for MailMask.

This is a test email sent to ${email} to ensure that email forwarding works.

You can now manage all your forwarding addresses via your account:

Please follow the link below to login:

${dashboardUrl}

thanks,

Team MailMask
`
  }
}

export async function sendNotification ({ username }) {
  const email = `root@mmk.vc`//buildCamoUrl(`congrats@`, username)

  this._log.info(`Sending signed-up email to ${username} via ${email}`)

  return this._sendEmail(email, SIGNED_UP, {}, {
    email,
    username,
    dashboardUrl: buildBackendUrl('/account'),
  })
}
