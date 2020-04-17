import { createTracer } from '@mailmask/log'
import { DB } from '@mailmask/data'

import config from './config'
import { createNotifier } from './notifier'
import { createMiddlewareWrapper } from './middleware'

export const doBootstrap = () => {
  const tracer = createTracer('mailmask-api', { config })
  const db = DB.create({ config })
  const notifier = createNotifier({ config, db })
  const wrapMiddleware = createMiddlewareWrapper({ config, tracer, db, notifier })

  process.on('uncaughtExceptions', error => {
    tracer.recordGlobalError('Uncaught exception', { error })
  })

  process.on('unhandledRejection', (reason, location) => {
    tracer.recordGlobalError(`Unhandled Rejection`, { reason, location })
  })

  return { config, tracer, notifier, db, wrapMiddleware }
}
