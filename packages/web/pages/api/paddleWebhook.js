import { SUB } from '@mailmask/utils'

import { doBootstrap } from '../../src/bootstrap'

const { db, paddleApi, wrapMiddleware } = doBootstrap()

const reverseLookupPlanScheduleByPaddlePlanId = planId => {
  const ret = {}

  Object.keys(SUB.PRODUCT_ID).forEach(plan => {
    Object.keys(SUB.PRODUCT_ID[plan]).forEach(schedule => {
      if (SUB.PRODUCT_ID[plan][schedule] === `${planId}`) {
        ret.schedule = schedule
        ret.plan = plan
      }
    })
  })

  return ret
}

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'POST': {
      req.span.recordEvent('paddle-webhook')

      try {
        const {
          alert_name: alertName,
          passthrough: data,
          subscription_plan_id: planId,
        } = req.body

        const { id } = JSON.parse(data)
        const { plan, schedule } = reverseLookupPlanScheduleByPaddlePlanId(planId)

        if (!plan || !schedule) {
          throw new Error(`Unrecognized paddle plan id: ${planId}`)
        }

        switch (alertName) {
          case 'subscription_cancelled': {
            await db.cancelSubscription(id)
            break
          }
          case 'subscription_payment_failed': {
            const {
              checkout_id: paddleCheckoutId,
              subscription_id: paddleSubId,
              next_retry_date: nextPaymentDateRaw,
              currency,
              amount: amountRaw,
            } = req.body

            const nextPaymentDate = new Date(nextPaymentDateRaw)
            const amount = `${amountRaw} ${currency}`

            // update sub in db
            await db.recordPaymentFailed(id, {
              plan,
              schedule,
              nextPaymentDate,
              paddleSubId,
              paddleCheckoutId,
              amount,
            })

            break
          }
          case 'subscription_payment_succeeded': {
            const {
              checkout_id: paddleCheckoutId,
              subscription_id: paddleSubId,
              next_payment_amount: nextPaymentAmountRaw,
              next_bill_date: nextPaymentDateRaw,
              currency,
              sale_gross: saleGross,
            } = req.body

            const amount = `${saleGross} ${currency}`
            const nextPaymentAmount = `${nextPaymentAmountRaw} ${currency}`
            const nextPaymentDate = new Date(nextPaymentDateRaw)

            // update sub in db
            await db.recordPaymentSucceeded(id, {
              /*
                we set plan and schedule each time since it's possible user opted
                to change a paid subscription from one type to another
              */
              plan,
              schedule,
              amount,
              nextPaymentAmount,
              nextPaymentDate,
              paddleSubId,
              paddleCheckoutId,
            })

            break
          }
          default: {
            // do nothing
          }
        }

        res.status(200)
        res.end()
      } catch (err) {
        req.span.finishWithError(err)
        res.status(500)
        res.end()
      }

      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default wrapMiddleware(endpoint)

