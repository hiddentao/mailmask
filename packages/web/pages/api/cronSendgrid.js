import { SUB } from '@mailmask/utils'

import { doBootstrap } from '../../src/bootstrap'

const { db, sendGridApi, wrapMiddleware } = doBootstrap()

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      req.span.recordEvent('cron:sendGrid')

      const users = await db.getUserDataForSendGrid()

      const data = users.reduce((m, { email, deleted, plan, status }) => {
        let signupStatus

        if (deleted) {
          signupStatus = sendGridApi.SIGNUP_STATUS.DELETED
        } else {
          if (status === SUB.STATUS.SELECTED) {
            if (plan !== SUB.PLAN.BASIC) {
              signupStatus = sendGridApi.SIGNUP_STATUS.PLAYMEN_PENDING
            } else {
              signupStatus = sendGridApi.SIGNUP_STATUS.REQUESTED_EMAIL
            }
          } else if (status === SUB.STATUS.ACTIVE) {
            signupStatus = sendGridApi.SIGNUP_STATUS.COMPLETED_SIGNUP
          }
        }

        if (signupStatus) {
          m.push({
            email,
            plan,
            signupStatus,
          })
        }

        return m
      }, [])

      await sendGridApi.updateUsers(data)

      res.status(200)
      res.setHeader('Content-Type', 'text/plain')
      res.end('OK!')

      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default wrapMiddleware(endpoint)

