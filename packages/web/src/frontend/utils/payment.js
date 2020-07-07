import { _, SUB } from '@mailmask/utils'

const takePayment = async ({ id, user, plan, schedule }) => {
  return new Promise((resolve, reject) => {
    window.Paddle.Checkout.open({
      product: SUB.PRODUCT_ID[plan][schedule],
      email: user.email,
      disableLogout: true,
      marketingConsent: true,
      passthrough: JSON.stringify({ id }),
      closeCallback: () => resolve(),
      successCallback: ret => {
        if (_.get(ret, 'checkout.completed')) {
          resolve(ret)
        } else {
          reject(ret)
        }
      },
    })
  })
}



export const preparePlanAndTakePayment = async ({ user, preparePlan, plan, schedule }) => {
  const { data, error } = await preparePlan({
    variables: {
      preparePlanRequest: { plan, schedule }
    }
  })

  if (error) {
    throw error
  }

  // only need to take payment if moving from free to a paid plan
  if (user.sub.plan === SUB.PLAN.BASIC && plan !== SUB.PLAN.BASIC) {
    const checkoutResult = await takePayment({
      id: _.get(data, 'result.id'),
      user,
      plan,
      schedule,
    })

    console.log('checkout result', checkoutResult)

    return !!checkoutResult
  } else {
    return true
  }
}
