import { isValidEmail, isValidUsername } from '@camomail/utils'

import { getDefaultResolvers } from './typedefs'
import { createErrorResponse } from './errors'
import { UNKNOWN, NOT_LOGGED_IN, INVALID_INPUT } from './errorCodes'

export default ({ db, notifier }) => {
  return {
    Query: {
      getMyProfile: (_ignore, __ignore, { user }) => {
        if (!user) {
          return createErrorResponse(NOT_LOGGED_IN)
        } else {
          return user
        }
      },
      getUsernameAvailability: async (_ignore, { username }) => {
        try {
          if (!isValidUsername(username)) {
            return createErrorResponse(INVALID_INPUT, 'Username invalid')
          }

          return {
            available: await db.isUsernameAvailable(username)
          }
        } catch (err) {
          return createErrorResponse(UNKNOWN, err.message)
        }
      }
    },
    Mutation: {
      requestLoginLink: async (_ignore, { email }) => {
        try {
          if (!isValidEmail(email)) {
            return createErrorResponse(INVALID_INPUT, 'Email invalid')
          }

          await notifier.sendNotification(notifier.TYPES.LOGIN, {
            email,
          })
        } catch (err) {
          return createErrorResponse(UNKNOWN, err.message)
        }

        return { success: true }
      },
      setUsername: async (_ignore, { username }, { user }) => {
        try {
          if (user.signedUp) {
            return createErrorResponse(INVALID_INPUT, 'Username already set')
          }

          if (!isValidUsername(username)) {
            return createErrorResponse(INVALID_INPUT, 'Invalid username')
          }

          await db.finalizeSignUp(user.id, username)

          await notifier.sendNotification(notifier.TYPES.SIGNED_UP, {
            username,
          })
        } catch (err) {
          return createErrorResponse(UNKNOWN, err.message)
        }

        return { success: true }
      }
    },
    ...getDefaultResolvers(),
  }
}


