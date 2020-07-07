import { createTracer } from '@mailmask/log'
import { DB } from '@mailmask/data'

import config from './config'
import { createNotifier } from './notifier'
import { createMiddlewareWrapper } from './middleware'
import { PaddleApi, SendGridApi } from './api'

export const doBootstrap = () => {
  const tracer = createTracer('mailmask-api', { config })
  const db = DB.create({ config })
  const sendGridApi = new SendGridApi({ config })
  const notifier = createNotifier({ config, sendGridApi, db })
  const paddleApi = new PaddleApi({ config })
  const wrapMiddleware = createMiddlewareWrapper({ config, tracer, db, notifier, paddleApi })

  process.on('uncaughtExceptions', error => {
    tracer.recordGlobalError('Uncaught exception', { error })
  })

  process.on('unhandledRejection', (reason, location) => {
    tracer.recordGlobalError(`Unhandled Rejection`, { reason, location })
  })

  return { config, tracer, notifier, db, sendGridApi, paddleApi, wrapMiddleware }
}
