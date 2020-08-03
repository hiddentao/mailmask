const { simpleParser } = require('mailparser')

const {
  _,
  formatISO,
  parseMaskEmailAddress,
  parseEmailAddress,
  buildMaskAddress,
} = require('@mailmask/utils')

const { REPLY_USERNAME, createReplyAddressPrefix, decodeReplyAddressPrefix } = require('@mailmask/nodejs-utils')

exports.log = console.log.bind(console)

exports.buildSenderStr = senderStr => {
  const {
    address: senderAddress,
    name: senderName
  } = (parseEmailAddress(senderStr) || {})

  if (senderAddress) {
    if (senderName) {
      return `${senderName} (${senderAddress})`
    } else {
      return senderAddress
    }
  } else {
    return senderStr
  }
}

exports.extractRecipients = ({ to, cc, bcc }) => {
  const map = [].concat(
    _.get(to, 'value', []),
    _.get(cc, 'value', []),
    _.get(bcc, 'value', []),
  ).reduce((m, { address }) => {
    m[address] = true
    return m
  }, {})

  return Object.keys(map)
}

exports.resolveMasks = async ({ span: rootSpan, db, config }, senderAddress, recipients) => {
  const cryptoConfig = { key: config.ENCRYPTION_KEY, iv: config.ENCRYPTION_IV }

  return rootSpan.withAsyncSpan('resolve masks', async ({ span }) => {
    // we use hashmap to ensure we avoid duplicate names
    const usernames = {}

    await Promise.all(recipients.map(async a => {
      await span.withAsyncSpan(
        'resolve mask',
        {
          address: a,
        },
        async ({ span: innerSpan }) => {
          // normalize it
          a = a.toLowerCase()
          // parse format: mask@username.msk.sh
          let maskEmail = a
          let { username, mask } = parseMaskEmailAddress(a)
          let destinationAddress = null
          let replyTo = senderAddress
          let isReplyToUser = false
          let isReplyToSender = false

          // if it looks like a reply, i.e. something@reply.msk.sh
          if (REPLY_USERNAME === username) {
            innerSpan.addFields({ isReply: true })

            const ret = await decodeReplyAddressPrefix(mask, cryptoConfig)

            innerSpan.addFields({ ret: JSON.stringify(ret) })

            // if successfully decoded
            if (ret.username) {
              innerSpan.addFields({
                decodeResult: 'pass',
              })

              ;({ username, mask, replyTo } = ret)

              maskEmail = buildMaskAddress(mask, username, config.DOMAIN)

              // if this is a reply from original sender back to user
              if (!ret.fromUser) {
                isReplyToUser = true
                replyTo = senderAddress // to stop someone else from spoofing the sender
              }
              // else this is a reply from user to original sender
              else {
                destinationAddress = replyTo
                isReplyToSender = true
              }
            }
            // if decode was unsuccessful we silently discard
            // since it could be that our encryption parameters have changed over time and this is an old address
            else {
              innerSpan.addFields({
                decodeResult: 'fail'
              })
              // don't continue
              return
            }
          }

          innerSpan.addFields({ username, mask, maskEmail })

          const replyAddressPrefix = await createReplyAddressPrefix({
            mask,
            username,
            replyTo,
            // it's from the user if it's a replying to a sender's reply or if it's replying to sender's original msg
            fromUser: !!isReplyToUser || !isReplyToSender,
          }, cryptoConfig)

          // add to list
          usernames[username] = usernames[username] || {}
          usernames[username][mask] = {
            maskEmail,
            isReplyToSender,
            isReplyToUser,
            destinationAddress,
            replyAddress: buildMaskAddress(replyAddressPrefix, REPLY_USERNAME, config.DOMAIN),
          }
        }
      )
    }))

    span.addFields({
      numUniqueUsernames: Object.keys(usernames).length
    })

    // now for the final list
    const final = {}

    // now get status of each mask
    await Promise.all(Object.keys(usernames).map(async username => {
      const maskNames = Object.keys(usernames[username])

      await span.withAsyncSpan(
        'get possible masks',
        {
          username,
          numMasks: maskNames.length,
        },
        async ({ span: innerSpan }) => {
          await Promise.all(maskNames.map(async mask => {
            const {
              maskEmail,
              destinationAddress,
              replyAddress,
              isReplyToSender,
              isReplyToUser,
            } = usernames[username][mask]

            // get mask status
            const maskStatus = await innerSpan.withAsyncSpan(
              'get mask status from db',
              {
                username,
                mask,
              },
              () => db.getPossibleMask(username, mask)
            )

            // if mask is enabled OR is new OR it's a reply to the sender
            if (isReplyToSender || maskStatus && (!maskStatus.mask || maskStatus.enabled)) {
              // if it's a reply to sender ensure it was sent from the user's registered address
              if (isReplyToSender && maskStatus.email.toLowerCase() !== senderAddress) {
                innerSpan.addFields({
                  senderForbidden: true
                })
              } else {
                final[username] = final[username] || {
                  mask,
                  username,
                  userId: maskStatus.userId,
                  usernameId: maskStatus.usernameId,
                  maskEmail,
                  destinationAddress: destinationAddress || maskStatus.email,
                  replyAddress,
                  isReplyToSender,
                  isReplyToUser,
                  // to keep track of all ENABLED masks which are encountered
                  masksToUpdate: [],
                }
                // add to mask list for this username
                final[username].masksToUpdate.push({
                  mask,
                  isNew: !maskStatus.mask,
                })
              }
            } else {
              innerSpan.addFields({
                noMasks: true
              })
            }
          }))
        }
      )
    }))

    return final
  })
}

exports.updateMaskStats = async ({ span: rootSpan, db }, resolvedMasks, numBytes) => {
  return rootSpan.withAsyncSpan('update mask stats', async ({ span }) => {
    await Promise.all(resolvedMasks.map(async resolvedMask => {
      const { username, usernameId, masksToUpdate } = resolvedMask

      await Promise.all(masksToUpdate.map(async ({ mask, isNew }) => {
        await span.withAsyncSpan(
          'update mask stats',
          {
            username,
            mask,
            isNew,
          },
          () => db.updateMaskStatsForReceivedEmail({
            usernameId,
            mask,
            numBytes,
            receivedAt: formatISO(new Date())
          })
        )
      }))
    }))
  })
}



exports.parseMail = async messageStream => {
  const parsed = await simpleParser(messageStream, {
    skipHtmlToText: true,
    skipImageLinks: true,
    skipTextToHtml: true,
    skipTextLinks: true,
  })
  // const parsed = await new Promise((resolve, reject) => {
  //   const mailParser = new MailParser()
  //   mailParser.on('end', resolve)
  //   mailParser.on('error', reject)
  //   mailParser.write(messageStream)
  //   mailParser.end()
  // })

  return {
    from: parsed.from,
    to: parsed.to,
    cc: parsed.cc || [],
    bcc: parsed.bcc || [],
    text: parsed.text,
    html: parsed.html,
    subject: parsed.subject,
    attachments: parsed.attachments || [],
  }
}

