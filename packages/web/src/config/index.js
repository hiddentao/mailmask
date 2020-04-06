const envalid = require('envalid')

const { str, bool } = envalid

const VARS = {
  APP_MODE: str({ devDefault: 'development' }),
  DOMAIN: str({ default: 'cml.pw' }),
  TESTMODE: bool({ default: false }),
  LOG_LEVEL: str({ default: 'info' }),
  MAILGUN_API_KEY: str(),
  ENCRYPTION_KEY: str(),
  ENCRYPTION_IV: str(),
}

const allEnv = envalid.cleanEnv(process.env, VARS, { dotEnvPath: '.env' })

const env = Object.keys(VARS).reduce((m, k) => {
  m[k] = allEnv[k]
  return m
}, {})


// eslint-disable-next-line import/no-dynamic-require
const modeConfig = require(`./${env.APP_MODE}`)

module.exports = Object.freeze({
  ...modeConfig,
  ...env,
})
