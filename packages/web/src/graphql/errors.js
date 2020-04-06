import _ from '../utils/lodash'

import * as codes from './errorCodes'

export const ERROR_CODES = Object.keys(codes).reduce((m, v) => {
  m[v] = v
  return m
}, {})

export const createErrorResponse = (message, code = ERROR_CODES.UNKNOWN) => {
  return {
    error: {
      __typename: 'ErrorDetails',
      code,
      message: message || codes[code],
    }
  }
}

export const resolveError = result => {
  const { data, error } = result
  const dataError = _.get(data, `${Object.keys(data || {})[0]}.error`)
  return dataError || error
}



/**
 * Stringify given GraphQL request error.
 *
 * @param  {*} err Error from GraphQL call.
 * @return {String}
 */
export const stringifyError = err => {
  if (Array.isArray(err)) {
    [ err ] = err
  }

  const code = err.code || _.get(err, 'extensions.exception.code')

  const str = [
    code ? `${err.message} (code: ${code})` : err.message
  ]

  _.get(err, 'networkError.result.errors', []).forEach(e => {
    str.push(exports.stringifyError(e))
  })

  return str.join('\n')
}
