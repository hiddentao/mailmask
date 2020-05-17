const { simpleParser } = require('mailparser')

const {
  _,
  formatISO,
  parseMaskEmailAddress,
  parseEmailAddress,
} = require('@mailmask/utils')

exports.log = console.log.bind(console)

exports.buildSenderStr = senderStr => {
  const { address: senderAddress, name: senderName } = (parseEmailAddress(senderStr) || {})

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

exports.resolveMasks = async ({ span: rootSpan, db }, recipients) => {
  return rootSpan.withAsyncSpan('resolve masks', async ({ span }) => {
    // we use hashmap to ensure we avoid duplicate names
    const usernames = {}

    recipients.forEach(a => {
      // normalize it
      a = a.toLowerCase()
      // parse format: mask@username.msk.sh
      const { username, mask } = parseMaskEmailAddress(a)
      // add to list
      usernames[username] = usernames[username] || {}
      usernames[username][mask] = { maskEmail: a }
      // if too many masks for one username then it might be spam :/
      if (Object.keys(usernames[username]).length > 5) {
        throw new Error(`Too many masks for username: ${username}`)
      }
    })

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
            const { maskEmail } = usernames[username][mask]

            // get mask status
            const maskStatus = await innerSpan.withAsyncSpan(
              'get mask status',
              {
                username,
                mask,
              },
              () => db.getPossibleMask(username, mask)
            )

            // if mask is enabled OR is new
            if (maskStatus && (!maskStatus.mask || maskStatus.enabled)) {
              final[username] = final[username] || {
                userId: maskStatus.userId,
                usernameId: maskStatus.usernameId,
                maskEmail,
                email: maskStatus.email,
                // to keep track of all ENABLED masks which are encountered
                masksToUpdate: [],
              }
              // add to mask list for this username
              final[username].masksToUpdate.push({
                mask,
                isNew: !maskStatus.mask,
              })
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

exports.updateMaskStats = async ({ span: rootSpan, db }, masks, numBytes) => {
  return rootSpan.withAsyncSpan('update mask stats', async ({ span }) => {
    await Promise.all(Object.keys(masks).map(async username => {
      const { usernameId, masksToUpdate } = masks[username]

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

