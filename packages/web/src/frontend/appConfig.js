export const isBrowser = !!process.browser

export const getAppConfig = () => ({
  // NOTE: next.js env var processor requires us to write "process.env.<...>" syntax in full
  BASE_URL: (isBrowser ? window.appConfig.BASE_URL : process.env.BASE_URL)
})
