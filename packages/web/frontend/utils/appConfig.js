const IS_SERVER_SIDE = (typeof process !== 'undefined' && !!(process.env))

export const getAppConfig = () => ({
  // NOTE: next.js env var processor requires us to write "process.env.<...>" syntax in full
  BASE_URL: (IS_SERVER_SIDE ? process.env.BASE_URL : window.appConfig.BASE_URL)
})
