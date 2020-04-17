const { parseEmailAddress } = require('@camomail/utils')
const Mailgun = require('mailgun-js')

class MailgunWrapper {
  constructor ({ apiKey, domain, testMode }) {
    this.mailgun = Mailgun({
      apiKey,
      domain,
      mute: true,
      host: 'api.eu.mailgun.net',
      testMode,
    })
  }

  async send ({ from, to, replyTo, subject, text, html, attachments }) {
    if (!replyTo) {
      replyTo = parseEmailAddress(from).address
    }

    return this.mailgun.messages().send({
      from,
      to: (Array.isArray(to) ? to.join(',') : to),
      'h:Reply-To': replyTo,
      subject,
      text,
      html,
      attachments: this._prepareAttachments(attachments),
    })
  }

  _prepareAttachments (attachments = []) {
    const { Attachment } = this.mailgun

    return attachments.map(({ filename, contentType, content: data, size: knownLength }, index) => {
      filename = filename || `attachment${index}`
      return new Attachment({ filename, contentType, data, knownLength })
    })
  }
}

module.exports = MailgunWrapper
