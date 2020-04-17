const sgMail = require('@sendgrid/mail')

class Mailer {
  constructor ({ apiKey, testMode }) {
    sgMail.setApiKey(apiKey)
    this.testMode = testMode
  }

  async send ({ from, to, replyTo, subject, text, html, attachments }) {
    if (this.testMode) {
      console.log(`
Mail wrapper would send email:

from: ${from}
to: ${to}
replyTo: ${replyTo}
subject: ${subject}
text: ${text}
html: ${html}
attachments: ${this._prepareAttachments(attachments).map(a => `${a.filename} (${a.type}`).join(', ')}
      `)

      return null
    } else {
      return sgMail.send({
        from,
        to,
        replyTo: replyTo || from,
        subject,
        text,
        html,
        attachments: this._prepareAttachments(attachments),
      })
    }
  }

  _prepareAttachments (attachments = []) {
    return attachments.map(({ filename, contentType, content }, index) => ({
      content: Buffer.isBuffer(content) ? content.toString('base64') : content,
      filename: filename || `attachment${index + 1}`,
      type: contentType,
      disposition: 'attachment',
    }))
  }
}

module.exports = Mailer
