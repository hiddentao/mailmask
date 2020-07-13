import { _ } from '@mailmask/utils'

import { middleware as ErrorMiddleware } from './error'
import { middleware as AuthMiddleware } from './auth'

export const createMiddlewareWrapper = args => endpoint => {
  return _.compose(
    ErrorMiddleware(args),
    AuthMiddleware(args)
  )(endpoint)
}
