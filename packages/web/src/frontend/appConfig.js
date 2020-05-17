export const isBrowser = !!process.browser

export const getAppConfig = () => ({
  // NOTE: next.js env var processor requires us to write "process.env.<...>" syntax in full
  APP_MODE: (isBrowser ? window.appConfig.APP_MODE : process.env.APP_MODE),
  WEB_URL: (isBrowser ? window.appConfig.WEB_URL : process.env.WEB_URL),
  DOMAIN: (isBrowser ? window.appConfig.DOMAIN : process.env.DOMAIN),
  SUPPORT_EMAIL: (isBrowser ? window.appConfig.SUPPORT_EMAIL : process.env.SUPPORT_EMAIL),
  ALIAS_SENDER_EMAIL: (isBrowser ? window.appConfig.ALIAS_SENDER_EMAIL : process.env.ALIAS_SENDER_EMAIL),
  PADDLE_VENDOR_ID: (isBrowser ? window.appConfig.PADDLE_VENDOR_ID : process.env.PADDLE_VENDOR_ID),
})

export const isProduction = () => (getAppConfig().APP_MODE === 'live')
