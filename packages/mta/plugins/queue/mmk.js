/* eslint-disable func-names */
const _ = require('lodash')
const { simpleParser } = require('mailparser')
const Log = require('@camomail/log')
const Mailgun = require('@camomail/mailgun')
const { DB } = require('@camomail/data')
const { parseEmailAddress } = require('@camomail/utils')

const config = require('../../config')

let mailgun
let log
let db


exports.register = function () {
  this.register_hook('init_master', 'mmk_setup')
  this.register_hook('init_child', 'mmk_setup')
  this.register_hook('queue', 'mmk_queue_handler')
}

exports.mmk_setup = function (next) {
  try {
    log = Log('mta', { level: config.LOG_LEVEL }).create('mmk')

    log.info('Setup mailgun ...')

    mailgun = new Mailgun({
      apiKey: config.MAILGUN_API_KEY,
      domain: config.DOMAIN,
      testMode: !!config.SMTP_TESTMODE,
    })

    log.info('Setup db ...')

    db = DB.create({ config, log })

    if (config.SMTP_TESTMODE) {
      log.info('Simulation Mode!')
    }

    next(CONT)
  } catch (err) {
    log.error('Setup error', err)
    next(DENY)
  }
}

const getUsers = async function (to, cc, bcc) {
  const toValues = _.get(to, 'value', [])
  const ccValues = _.get(cc, 'value', [])
  const bccValues = _.get(bcc, 'value', [])
  const addresses = [].concat(toValues, ccValues, bccValues).map(({ address }) => address)

  // we use hashmap to ensure we avoid duplicate users
  const users = {}

  addresses.forEach(a => {
    // parse format: mask@username.msk.sh
    const { username, mask } = parseEmailAddress(a)

    users[username] = users[username] || {
      masks: {},
      maskCount: 0,
    }
    users[username].masks[mask] = true
    users[username].maskCount += 1

    if (users[username].maskCount > 5) {
      throw new Error('Too many masks in use at once, possible spam')
    }
  })

  // for the final list
  const finalUsers = {}

  // now get status of each mask
  await Promise.all(Object.keys(users).map(async username => {
    const { masks } = users[username]
    const maskNames = Object.keys(masks)

    // check that user exists
    log.debug(`Check that user exists: ${username} ...`)

    const userObj = await db.getUserByUsername(username)

    if (userObj) {
      log.debug(`Get mask statuses for: ${username}, ${maskNames.length} masks ...`)

      const masksAndTheirStatuses = await db.getMaskStatuses(username, maskNames)

      const finalMasks = {}

      let atleastOneMaskEnabled = false

      // save to final list
      masksAndTheirStatuses.forEach(({ name, enabled }) => {
        atleastOneMaskEnabled = atleastOneMaskEnabled || enabled

        finalMasks[name] = {
          enabled
        }
      })

      // add missing masks (and these ones wil be marked as "new"
      // so that we remember to save them later on!)
      maskNames.forEach(mask => {
        if (!finalMasks[mask]) {
          atleastOneMaskEnabled = true

          finalMasks[mask] = {
            enabled: true,
            isNew: true,
          }
        }
      })

      // finalize
      if (atleastOneMaskEnabled) {
        finalUsers[username] = {
          id: userObj.id,
          email: userObj.email,
          masks: finalMasks,
        }
      } else {
        log.debug(`No masks enabled for user: ${username} :'(`)
      }
    }
  }))

  log.debug('Final list of users and masks', JSON.stringify(finalUsers, null, 2))

  return finalUsers
}

const addNewMasksToDb = async users => {
  const finalToAdd = {}

  Object.keys(users).forEach(username => {
    const { id, masks } = users[username]

    const newMasks = Object.keys(masks).filter(m => {
      return masks[m].isNew
    })

    if (newMasks.length) {
      finalToAdd[username] = {
        id,
        masks: newMasks
      }
    }
  })

  await Promise.all(Object.keys(finalToAdd).map(async username => {
    const { id, masks } = finalToAdd[username]

    log.debug(`Saving ${masks.length} new masks for user ${username}`)

    return db.saveNewMasks(id, masks)
  }))
}

exports.mmk_queue_handler = async (next, connection) => {
  try {
    log.debug('Processing incoming msg...')

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
    const userData = Object.values(users)

    if (userData.length) {
      log.info(`Sending to ${userData.length} users ...`)

      const msg = {
        from: `"${senderStr}" <bot@${config.DOMAIN}>`,
        to: userData.map(u => u.email),
        subject,
        text,
        html,
        attachments,
      }

      await mailgun.send(msg)

      log.info(`... emails sent`)

      await addNewMasksToDb(users)

    } else {
      log.debug('(nothing to send since no matching users found)')
    }

    log.debug('...processed')

    next(OK)
  } catch (err) {
    log.error('Processing error', err)
    next(DENY, `Error queueing message: ${err.message}`)
  }
}
