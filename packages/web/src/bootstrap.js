import createLog from '@camomail/log'
import { DB } from '@camomail/data'

import config from './config'
import { createNotifier } from './notifier'
import { createMiddlewareWrwapper } from './middleware'

export const doBootstrap = () => {
  const log = createLog('api', { level: config.LOG_LEVEL })
  const db = DB.create({ log, config })
  const notifier = createNotifier({ config, log, db })
  const wrapMiddleware = createMiddlewareWrwapper({ config, log, db, notifier })

  process.on('uncaughtExceptions', e => {
    log.error('Uncaught exception', e)
  })

  process.on('unhandledRejection', (reason, p) => {
    log.error('Unhandled Rejection at:', p, 'reason:', reason)
  })

  return { config, log, notifier, db, wrapMiddleware }
}
