const envalid = require('envalid')

const { str, bool } = envalid

const VARS = {
  APP_MODE: str({ default: 'development' }),
  DOMAIN: str({ default: 'cml.pw' }),
  SIMULATED: bool({ default: false }),
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
