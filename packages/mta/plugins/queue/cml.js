const _ = require('lodash')
const { simpleParser } = require('mailparser')
const Mailgun = require('mailgun-js')
const Log = require('@camomail/log')
const { Db: { createDb } } = require('@camomail/data')

const config = require('../../config')

let mailgun
let logger
let db

// eslint-disable-next-line func-names
exports.register = function () {
  this.register_hook('init_master', 'cml_setup')
  this.register_hook('init_child', 'cml_setup')
  this.register_hook('queue', 'cml_queue_handler')
}

// eslint-disable-next-line func-names
exports.cml_setup = function (next) {
  try {
    logger = Log('mta').create('cml')

    logger.info('Setup mailgun ...')

    mailgun = Mailgun({
      apiKey: config.MAILGUN_API_KEY,
      domain: config.DOMAIN,
      mute: true,
      host: 'api.eu.mailgun.net',
      testMode: !!config.SIMULATED,
    })

    logger.info('Setup db ...')

    db = createDb({ env: 'development', logger })

    if (config.SIMULATED) {
      logger.info('Simulation Mode!')
    }

    next(CONT)
  } catch (err) {
    logger.error('Setup error', err)
    next(DENY)
  }
}

// eslint-disable-next-line func-names
const getUsers = async function (to, cc, bcc) {
  const toValues = _.get(to, 'value', [])
  const ccValues = _.get(cc, 'value', [])
  const bccValues = _.get(bcc, 'value', [])
  const addresses = [].concat(toValues, ccValues, bccValues).map(({ address }) => address)

  const usernames = addresses.map(a => {
    const atPos = a.indexOf('@')
    const firstDotPos = a.substr(atPos).indexOf('.')
    return a.substr(atPos + 1, firstDotPos - 1)
  })

  return db.getUsersByUsernames(usernames)
}

const prepareAttachments = attachments => {
  return attachments.map(({ filename, contentType, content: data, size: knownLength }, index) => {
    filename = filename || `attachment${index}`
    return new mailgun.Attachment({ filename, contentType, data, knownLength })
  })
}

exports.cml_queue_handler = async (next, connection) => {
  try {
    logger.debug('Processing incoming msg...')

    const txFrom = _.get(connection, 'transaction.mail_from.user')
    const incomingMsg = _.get(connection, 'transaction.message_stream.write_ce.bufs')

    const parsed = await simpleParser(Buffer.concat(incomingMsg), {
      skipHtmlToText: true,
      skipImageLinks: true,
      skipTextToHtml: true,
      skipTextLinks: true,
    })

    const { address: sender, name: senderName } = parsed.from.value[0]
    const senderStr = `${senderName || txFrom} (${sender})`
    const { to, cc, bcc, text, html, subject, attachments } = parsed

    // get matching users
    const users = await getUsers(to, cc, bcc)

    if (users.length) {
      logger.info(`Sending to ${users.length} users (${users[0].username}, etc)...`)

      const msg = {
        from: `"${senderStr}" <bot@${config.DOMAIN}>`,
        to: users.map(u => u.email).join(','),
        subject,
        text,
        html,
        attachment: prepareAttachments(attachments),
      }

      await mailgun.messages().send(msg).then(() => logger.info(`... email sent`))
    } else {
      logger.debug('(nothing to send since no matching users found)')
    }

    logger.debug('...processed')

    next(OK)
  } catch (err) {
    logger.error('Processing error', err)
    next(DENY, 'Error queueing message, see logs.')
  }
}
