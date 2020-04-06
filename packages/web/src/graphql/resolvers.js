import { getDefaultResolvers } from './typedefs'
import { createErrorResponse } from './errors'
import { UNKNOWN, NOT_LOGGED_IN } from './errorCodes'

export default ({ notifier }) => {
  return {
    Query: {
      getMyProfile: (_ignore, __ignore, { user }) => {
        if (!user) {
          return createErrorResponse(NOT_LOGGED_IN)
        } else {
          return user
        }
      }
    },
    Mutation: {
      requestLoginLink: async (_ignore, { email }) => {
        try {
          await notifier.sendNotification(notifier.TYPES.LOGIN, {
            email,
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


