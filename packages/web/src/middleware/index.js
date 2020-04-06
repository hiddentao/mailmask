import { _ } from '@camomail/utils'

import { middleware as ErrorMiddleware } from './error'
import { middleware as AuthMiddleware } from './auth'

export const createMiddlewareWrwapper = args => endpoint => {
  return _.compose(ErrorMiddleware(args), AuthMiddleware(args))(endpoint)
}
