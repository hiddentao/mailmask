import { Client } from '@sendgrid/client'
import { _, makeConstants } from '@mailmask/utils'

import { SENDGRID_ERROR } from '../graphql/errorCodes'
import { throwError } from '../graphql/errors'

export const CUSTOM_FIELDS = makeConstants([
  'SIGNUP_STATUS',
  'PLAN'
])

const CUSTOM_FIELD_IDS = {
  [CUSTOM_FIELDS.SIGNUP_STATUS]: 'e1_T',
  [CUSTOM_FIELDS.PLAN]: 'e3_T',
}

export const SIGNUP_STATUS = makeConstants([
  'REQUESTED_EMAIL',
  'PAYMENT_PENDING',
  'COMPLETED_SIGNUP',
  'DELETED',
])

export class SendGridApi {
  constructor ({ config }) {
    this._client = new Client()
    this._client.setApiKey(config.MAILER_API_KEY)
    this._listId = config.SENDGRID_CAMPAIGN_LIST

    this.SIGNUP_STATUS = SIGNUP_STATUS
  }

  async updateUsers (data) {
    await this._put('/marketing/contacts', {
      list_ids: [ this._listId ],
      contacts: data.map(({ email, plan, signupStatus }) => {
        return {
          email,
          custom_fields: {
            [CUSTOM_FIELD_IDS[CUSTOM_FIELDS.SIGNUP_STATUS]]: signupStatus,
            [CUSTOM_FIELD_IDS[CUSTOM_FIELDS.PLAN]]: plan,
          }
        }
      }),
    })
  }

  async _put (apiFunc, body) {
    return this._exec('PUT', apiFunc, body)
  }

  async _exec (method, apiFunc, body) {
    try {
      const [ response, responseBody ] = await this._client.request({
        method,
        url: `/v3${apiFunc}`,
        ...(method !== 'GET' ? { body } : {})
      })

      if (400 <= response.statusCode) {
        throwError(SENDGRID_ERROR, response.message)
      }

      return responseBody
    } catch (err) {
      const errBody = _.get(err, 'response.body')

      if (errBody) {
        console.error(JSON.stringify(errBody, null, 2))
      }

      throwError(SENDGRID_ERROR, err.message)
    }
  }
}

