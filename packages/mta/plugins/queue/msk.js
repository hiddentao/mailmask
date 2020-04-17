/* eslint-disable func-names */
const _ = require('lodash')
const { simpleParser } = require('mailparser')
const { createTracer } = require('@camomail/log')
const Mailgun = require('@camomail/mailgun')
const { DB } = require('@camomail/data')
const { obfuscate } = require('@camomail/utils')

const config = require('../../config')
const {
  extractRecipients,
  getUsers,
  saveNewMasks,
} = require('./utils')

let mailgun
let db

const tracer = createTracer('camomail-mta', { config })

exports.register = function () {
  this.register_hook('init_master', 'msk_setup')
  this.register_hook('init_child', 'msk_setup')
  this.register_hook('queue', 'msk_queue_handler')
}

exports.msk_setup = function (next) {
  const span = tracer.startTrace('msk_setup', { type: 'setup' })

  try {
    span.recordEvent('setup mailgun')

    mailgun = new Mailgun({
      apiKey: config.MAILGUN_API_KEY,
      domain: config.DOMAIN,
      testMode: !!config.SMTP_TESTMODE,
    })

    span.recordEvent('setup db')

    db = DB.create({ config, tracer })

    if (config.SMTP_TESTMODE) {
      span.recordEvent('simulation mode')
    }

    span.finish()

    next(CONT)
  } catch (err) {
    span.finishWithError(err)

    next(DENY)
  }
}


exports.msk_queue_handler = async (next, connection) => {
  const span = tracer.startTrace(`msk_queue_handler`, { type: 'queue' })

  try {
    const txFrom = _.get(connection, 'transaction.mail_from.user')
    const incomingMsg = _.get(connection, 'transaction.message_stream.write_ce.bufs')

    span.addFields({
      from: obfuscate(txFrom)
    })

    const parsed = await span.withAsyncSpan('parse', () => {
      return simpleParser(Buffer.concat(incomingMsg), {
        skipHtmlToText: true,
        skipImageLinks: true,
        skipTextToHtml: true,
        skipTextLinks: true,
      })
    })

    const { address: sender, name: senderName } = parsed.from.value[0]
    const senderStr = `${senderName || txFrom} (${sender})`
    const {
      to,
      cc,
      bcc,
      text,
      html,
      subject,
      attachments
    } = parsed

    const recipients = extractRecipients({ to, cc, bcc })

    span.addFields({
      subject,
      to: recipients.map(r => obfuscate(r))
    })

    // get matching users
    const users = await getUsers({ span, db }, recipients)

    const userData = Object.values(users)

    span.addFields({
      numFinalRecipients: userData.length
    })

    if (userData.length) {
      const baseMsg = {
        from: `"${senderStr}" <no-reply@${config.DOMAIN}>`,
        replyTo: sender,
        subject,
        attachments,
      }

      await Promise.all(
        userData.map(u => span.withAsyncSpan('send', async ({ span: sendSpan }) => {
          sendSpan.addFields({
            uid: u.id,
          })

          const msg = {
            ...baseMsg,
            to: u.email,
          }

          if (text) {
            msg.text = `(Originally sent to ${u.maskEmail} and forwarded to you by MailMask. You can turn this mask off in your dashboard at https://msk.sh/dashboard)\n\n${text}`
          }

          if (html) {
            msg.html = `<p><strong>(Originally sent to ${u.maskEmail} and forwarded to you by MailMask. You can turn this mask off in your dashboard at <a href="https://msk.sh/dashboard">https://msk.sh/dashboard</a>)</strong></p><br />${html}`
          }

          await sendSpan.withAsyncSpan('send via mailgun', () => mailgun.send(msg))
        }))
      )

      await saveNewMasks({ span, db }, users)
    }

    span.finish()
    next(OK)
  } catch (err) {
    span.finishWithError(err)
    next(DENY, `Error queueing message: ${err.message}`)
  }
}



