const { _, parseMaskEmailAddress } = require('@camomail/utils')

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
      // parse format: mask@username.msk.sh
      const { username, mask } = parseMaskEmailAddress(a)

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

    span.addFields({
      numUniqueUsernames: Object.keys(users).length
    })

    // for the final list
    const finalUsers = {}

    // now get status of each mask
    await Promise.all(Object.keys(users).map(username => {
      return span.withAsyncSpan('get mask status', async ({ span: innerSpan }) => {
        const { masks } = users[username]
        const maskNames = Object.keys(masks)

        // check that user exists
        const userObj = await innerSpan.withAsyncSpan(
          'check user exists',
          { username },
          () => db.getUserByUsername(username)
        )

        if (userObj) {
          const masksAndTheirStatuses = await innerSpan.withAsyncSpan(
            'get mask statuses',
            {
              username,
              numMasks: maskNames.length,
            },
            () => db.getMaskStatuses(username, maskNames)
          )

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
      const { id, masks } = users[username]

      const newMasks = Object.keys(masks).filter(m => {
        return masks[m].isNew
      })

      if (newMasks.length) {
        finalToAdd[username] = {
          id,
          masks: newMasks
        }

        numMasks += newMasks.length
      }
    })

    span.addFields({
      numUsers: Object.keys(finalToAdd).length,
      numMasks,
    })

    await Promise.all(Object.keys(finalToAdd).map(async username => {
      return span.withAsyncSpan('save masks for user', async ({ span: innerSpan }) => {
        const { id, masks } = finalToAdd[username]

        await innerSpan.withAsyncSpan(
          'save to db',
          {
            id,
            numMasks: masks.length
          },
          () => db.saveNewMasks(id, masks)
        )
      })
    }))
  })
}
