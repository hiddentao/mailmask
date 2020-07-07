import { _ } from '@mailmask/utils'

import * as codes from './errorCodes'

export const ERROR_CODES = Object.keys(codes).reduce((m, v) => {
  m[v] = v
  return m
}, {})

export const throwError = (code = ERROR_CODES.UNKNOWN, message = '') => {
  const e = new Error(message || codes.messages[code])
  e.code = code
  throw e
}

export const createErrorResponse = (code = ERROR_CODES.UNKNOWN, message = '') => {
  return {
    error: {
      __typename: 'ErrorDetails',
      code,
      message: message || codes.messages[code],
    }
  }
}

export const resolveError = result => {
  const { data, error } = result
  const dataError = _.get(data, `${Object.keys(data || {})[0]}.error`)
  return dataError || error
}



/**
 * Construct user friendly `Error` from given given GraphQL request error.
 *
 * @param  {*} err Error from GraphQL call.
 * @return {Error}
 */
export const constructUserFriendlyError = err => {
  if (Array.isArray(err)) {
    [ err ] = err
  }

  const str = [ err.message ]

  _.get(err, 'networkError.result.errors', []).forEach(e => {
    str.push(constructUserFriendlyError(e).message)
  })

  const e = new Error(str.join('\n'))
  e.code = err.code || _.get(err, 'extensions.exception.code')

  return e
}
