import got from 'got'
import formUrlEncode from 'form-urlencoded'
import { _, SUB } from '@mailmask/utils'

import { PADDLE_ERROR } from '../graphql/errorCodes'
import { throwError } from '../graphql/errors'

export class PaddleApi {
  constructor ({ config }) {
    this._fetch = got.extend({
      responseType: 'json',
    })

    this._config = config
  }

  async _call (id, theCall) {
    try {
      const { body } = await theCall

      if (body.error) {
        throw new Error(_.get(body, 'error.message', `Call failed: ${id}`))
      }

      return body
    } catch (err) {
      throwError(PADDLE_ERROR, err.message)
    }
  }

  async _get (apiPath, params) {
    return this._call(apiPath, this._fetch.get(apiPath, {
      searchParams: {
        vendor_id: this._config.PADDLE_VENDOR_ID,
        vendor_auth_code: this._config.PADDLE_AUTH_CODE,
        ...params,
      }
    }))
  }

  async _post (apiPath, params) {
    return this._call(apiPath, this._fetch.post(apiPath, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formUrlEncode({
        vendor_id: this._config.PADDLE_VENDOR_ID,
        vendor_auth_code: this._config.PADDLE_AUTH_CODE,
        ...params,
      })
    }))
  }

  async cancelSub (subId) {
    return this._post('https://vendors.paddle.com/api/2.0/subscription/users_cancel', {
      subscription_id: subId,
    })
  }

  async getOrderStatus (checkoutId) {
    const orderInfo = await this._get('https://checkout.paddle.com/api/1.0/order', {
      checkout_id: checkoutId,
    })

    const state = _.get(orderInfo, 'state')
    const subId = _.get(orderInfo, 'order.subscription_id')

    if ('processed' === state && !subId) {
      throwError(PADDLE_ERROR, `Unable to get subscription id`)
    }

    return { state, subId }
  }

  async getSubInfo (subId) {
    const subInfo = await this._post('https://vendors.paddle.com/api/2.0/subscription/users', {
      subscription_id: subId,
    })

    const nextPaymentDate = new Date(_.get(subInfo, 'response.0.next_payment.date'))
    const nextPaymentAmount = _.get(subInfo, 'response.0.next_payment.amount')

    if (nextPaymentAmount === undefined) {
      throwError(PADDLE_ERROR, `Unable to get subscription info`)
    }

    return { nextPaymentAmount, nextPaymentDate }
  }

  async changeSub (subId, plan, schedule) {
    return this._post('https://vendors.paddle.com/api/2.0/subscription/users/update', {
      subscription_id: subId,
      plan_id: SUB.PRODUCT_ID[plan][schedule],
      bill_immediately: true,
    })
  }
}
