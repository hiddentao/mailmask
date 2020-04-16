export const isBrowser = !!process.browser

export const getAppConfig = () => ({
  // NOTE: next.js env var processor requires us to write "process.env.<...>" syntax in full
  APP_MODE: (isBrowser ? window.appConfig.APP_MODE : process.env.APP_MODE),
  WEB_URL: (isBrowser ? window.appConfig.WEB_URL : process.env.WEB_URL),
  DOMAIN: (isBrowser ? window.appConfig.DOMAIN : process.env.DOMAIN),
  SUPPORT_EMAIL: (isBrowser ? window.appConfig.SUPPORT_EMAIL : process.env.SUPPORT_EMAIL)
})

export const isProduction = () => (getAppConfig().APP_MODE === 'live')
