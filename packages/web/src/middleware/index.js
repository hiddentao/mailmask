import { _ } from '@camomail/utils'

import { middleware as TracerMiddleware } from './tracer'
import { middleware as ErrorMiddleware } from './error'
import { middleware as AuthMiddleware } from './auth'

export const createMiddlewareWrwapper = args => endpoint => {
  return _.compose(
    TracerMiddleware(args),
    ErrorMiddleware(args),
    AuthMiddleware(args)
  )(endpoint)
}
