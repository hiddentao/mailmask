import { getDefaultResolvers } from './typedefs'
import { createErrorResponse } from './errors'

export default ({ notifier }) => {
  return {
    Query: {
      dummy: () => true
    },
    Mutation: {
      requestLoginLink: async (_ignore, { email }) => {
        try {
          await notifier.sendNotification(notifier.TYPES.LOGIN, {
            email,
            loginToken: 'test'
          })
        } catch (err) {
          return createErrorResponse(err.message)
        }

        return { success: true }
      }
    },
    ...getDefaultResolvers(),
  }
}


