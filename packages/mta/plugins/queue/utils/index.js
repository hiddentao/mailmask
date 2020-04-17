const { _, parseMaskEmailAddress, parseEmailAddress } = require('@camomail/utils')

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

exports.getUsers = async ({ span: rootSpan, db }, recipients) => {
  return rootSpan.withAsyncSpan('get users', async ({ span }) => {
    // we use hashmap to ensure we avoid duplicate users
    const users = {}

    recipients.forEach(a => {
      // normalize it
      a = a.toLowerCase()
      // parse format: mask@username.msk.sh
      const { username, mask } = parseMaskEmailAddress(a)
      // note that only the last mask for the user counts (this helps prevent mass mask spam)
      users[username] = { mask, maskEmail: a }
    })

    span.addFields({
      numUniqueUsernames: Object.keys(users).length
    })

    // for the final list
    const finalUsers = {}

    // now get status of each mask
    await Promise.all(Object.keys(users).map(username => {
      return span.withAsyncSpan('get mask status', async ({ span: innerSpan }) => {
        const { mask, maskEmail } = users[username]

        // check that user exists
        const userObj = await innerSpan.withAsyncSpan(
          'check user exists',
          { username },
          () => db.getUserByUsername(username)
        )

        if (userObj) {
          const ret = await innerSpan.withAsyncSpan(
            'get mask status',
            {
              username,
              mask,
            },
            () => db.getMaskStatuses(username, [ mask ])
          )

          // if enabled OR is new
          if (_.get(ret, '0.enabled') || !ret.length) {
            finalUsers[username] = {
              id: userObj.id,
              email: userObj.email,
              mask,
              maskEmail,
              isNew: !ret.length,
            }
          } else {
            innerSpan.addFields({
              noMasks: true
            })
          }
        }
      })
    }))

    return finalUsers
  })
}

exports.saveNewMasks = async ({ span: rootSpan, db }, users) => {
  return rootSpan.withAsyncSpan('save new masks', async ({ span }) => {
    const finalToAdd = {}
    let numMasks = 0

    Object.keys(users).forEach(username => {
      const { id, mask, isNew } = users[username]

      if (isNew) {
        finalToAdd[username] = {
          id,
          mask,
        }

        numMasks += 1
      }
    })

    span.addFields({
      numUsers: Object.keys(finalToAdd).length,
      numMasks,
    })

    await Promise.all(Object.keys(finalToAdd).map(async username => {
      return span.withAsyncSpan('save masks for user', async ({ span: innerSpan }) => {
        const { id, mask } = finalToAdd[username]

        await innerSpan.withAsyncSpan(
          'save to db',
          {
            id,
            mask,
          },
          () => db.saveNewMasks(id, [ mask ])
        )
      })
    }))
  })
}
