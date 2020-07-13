import Rollbar from 'rollbar'
import { DB } from '@mailmask/data'

import config from './config'
import { createNotifier } from './notifier'
import { createMiddlewareWrapper } from './middleware'
import { PaddleApi, SendGridApi } from './api'

let rollbar
if (config.ROLLBAR_SERVER_ACCESS_TOKEN) {
  rollbar = new Rollbar({
    accessToken: config.ROLLBAR_SERVER_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: (config.APP_MODE === 'live') ? 'production' : 'development'
    }
  })
}

export const doBootstrap = () => {
  const db = DB.create({ config })
  const sendGridApi = new SendGridApi({ config })
  const notifier = createNotifier({ config, sendGridApi, db })
  const paddleApi = new PaddleApi({ config })
  const wrapMiddleware = createMiddlewareWrapper({ config, db, notifier, paddleApi })

  return { config, notifier, db, sendGridApi, paddleApi, wrapMiddleware }
}
