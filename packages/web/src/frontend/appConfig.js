export const isBrowser = !!process.browser

export const getAppConfig = () => ({
  // NOTE: next.js env var processor requires us to write "process.env.<...>" syntax in full
  WEB_URL: (isBrowser ? window.appConfig.WEB_URL : process.env.WEB_URL)
})
