import { isValidEmail, isValidUsername, SUB } from '@mailmask/utils'

import { getDefaultResolvers } from './typedefs'
import { createErrorResponse } from './errors'
import { UNKNOWN, NOT_LOGGED_IN, INVALID_INPUT } from './errorCodes'

const _call = fn => async (root, params, ctx) => {
  try {
    return await fn(root, params, ctx)
  } catch (err) {
    return createErrorResponse(err.code || UNKNOWN, err.message)
  }
}


const _authCall = fn => async (root, params, ctx) => {
  try {
    if (!ctx.user) {
      return createErrorResponse(NOT_LOGGED_IN)
    }

    return await fn(root, params, ctx)
  } catch (err) {
    return createErrorResponse(err.code || UNKNOWN, err.message)
  }
}




export default ({ db, notifier, paddleApi }) => {
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
        const results = await db.getMasks(user.id, paging)

        results.items.forEach(item => {
          // basic plans can't see per-mask stats
          if (user.sub.plan === SUB.PLAN.BASIC) {
            delete item.stats
          }
        })

        return results
      }),
      getMyMonthlyStats: _authCall(async (_ignore, __ignore, { user }) => {
        return db.getCurrentPeriodStats(user.id)
      }),
    },
    Mutation: {
      preparePlan: _authCall(async (_ignore, {
        preparePlanRequest: {
          plan,
          schedule
        }
      }, { user }) => {
        // if plan or schedule has changed
        if (plan !== user.sub.plan || schedule !== user.sub.schedule) {
          // if user is currently on a paid plan
          if (user.sub.plan !== SUB.PLAN.BASIC && user.sub.status !== SUB.STATUS.SELECTED && user.sub.status !== SUB.STATUS.CANCELLED) {
            // if moving to a Basic plan
            if (plan === SUB.PLAN.BASIC) {
              // cancel subscription at Paddle
              await paddleApi.cancelSub(user.sub.paddleSubId)
            } else {
              // else just change the subscription at Paddle
              await paddleApi.changeSub(user.sub.paddleSubId, plan, schedule)
              // return existing local subcription details as is!
              return user.sub
            }
          }

          // if at this point then it's time to create a new subscription
          return db.prepareNewSubscription(user.id, {
            plan,
            schedule,
          })
        }
        // unchanged
        else {
          // if plan not pending then this is an invalid call
          if (user.sub.status !== SUB.STATUS.SELECTED) {
            return createErrorResponse(INVALID_INPUT, 'Plan unchanged, and already active')
          }

          return user.sub
        }
      }),
      requestLoginLink: _call(async (_ignore, { loginLinkRequest: { email, plan, schedule } }) => {
        if (!isValidEmail(email)) {
          return createErrorResponse(INVALID_INPUT, 'Email invalid')
        }

        const user = await db.getUserByEmail(email)

        if (user) {
          await notifier.sendNotification(notifier.TYPES.LOGIN, {
            email,
          })
        } else {
          await notifier.sendNotification(notifier.TYPES.SIGNUP, {
            email,
            plan: plan || SUB.PLAN.BASIC, /* sign up to basic plan by default */
            schedule: schedule || SUB.SCHEDULE.MONTHLY,
          })
        }

        return { success: true }
      }),
      completeSignup: _authCall(async (_ignore, { signUp: { username } }, { user }) => {
        if (user.sub.status !== SUB.STATUS.SELECTED) {
          return createErrorResponse(INVALID_INPUT, 'Already completed signup')
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
        // if paid subscription is active then cancel it
        if (user.sub.plan !== SUB.PLAN.BASIC &&
            (user.sub.status === SUB.STATUS.ACTIVE || user.sub.status === SUB.STATUS.PAYMENT_FAILED)
        ) {
          // cancel subscription at Paddle
          await paddleApi.cancelSub(user.sub.paddleSubId)
        }

        await db.deleteUser(user.id)
        await setUser({})

        return { success: true }
      }),
    },
    ...getDefaultResolvers(),
  }
}


