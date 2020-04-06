import createLog from '@camomail/log'

import { createNotifier } from './notifier'

export const doBootstrap = ({ config }) => {
  const log = createLog(config)
  const notifier = createNotifier({ config, log })

  process.on('uncaughtExceptions', e => {
    log.error('Uncaught exception', e)
  })

  process.on('unhandledRejection', (reason, p) => {
    log.error('Unhandled Rejection at:', p, 'reason:', reason)
  })

  return { log, notifier }
}
