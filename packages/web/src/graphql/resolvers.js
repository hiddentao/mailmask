import { isValidEmail, isValidUsername } from '@mailmask/utils'

import { getDefaultResolvers } from './typedefs'
import { createErrorResponse } from './errors'
import { UNKNOWN, NOT_LOGGED_IN, INVALID_INPUT } from './errorCodes'



const _call = fn => async (root, params, ctx) => {
  try {
    return fn(root, params, ctx)
  } catch (err) {
    return createErrorResponse(err.code || UNKNOWN, err.message)
  }
}


const _authCall = fn => async (root, params, ctx) => {
  try {
    if (!ctx.user) {
      return createErrorResponse(NOT_LOGGED_IN)
    }

    return fn(root, params, ctx)
  } catch (err) {
    return createErrorResponse(err.code || UNKNOWN, err.message)
  }
}



export default ({ db, notifier }) => {
  return {
    Query: {
      getMyProfile: _authCall((_ignore, __ignore, { user }) => {
        return user
      }),
      getUsernameAvailability: _call(async (_ignore, { username }) => {
        if (!isValidUsername(username)) {
          return createErrorResponse(INVALID_INPUT, 'Username invalid')
        }

        return {
          available: await db.isUsernameAvailable(username)
        }
      }),
      getMyMasks: _authCall(async (_ignore, { paging }, { user }) => {
        return db.getMasks(user.id, paging)
      })
    },
    Mutation: {
      requestLoginLink: _call(async (_ignore, { email }) => {
        if (!isValidEmail(email)) {
          return createErrorResponse(INVALID_INPUT, 'Email invalid')
        }

        await notifier.sendNotification(notifier.TYPES.LOGIN, {
          email,
        })

        return { success: true }
      }),
      completeSignup: _authCall(async (_ignore, { signUp: { username } }, { user }) => {
        if (user.signedUp) {
          return createErrorResponse(INVALID_INPUT, 'Already signed up')
        }

        if (!isValidUsername(username)) {
          return createErrorResponse(INVALID_INPUT, 'Invalid username')
        }

        await db.finalizeSignUp(user.id, username)

        // this doesn't have to succeed, so we don't wait for it
        notifier.sendNotification(notifier.TYPES.SIGNED_UP, {
          email: user.email,
          username,
        })

        return { success: true }
      }),
      updateMaskStatus: _authCall(async (_ignore, { name, enabled }, { user }) => {
        await db.updateMaskStatus(user.id, name, enabled)

        return { success: true }
      }),
      deleteAccount: _authCall(async (_ignore, __ignore, { user, setUser }) => {
        await db.deleteUser(user.id)
        await setUser({})

        return { success: true }
      }),
    },
    ...getDefaultResolvers(),
  }
}


