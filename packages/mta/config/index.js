const envalid = require('envalid')

const { str, bool } = envalid

const VARS = {
  DOMAIN: str({ default: 'cml.pw' }),
  SIM: bool({ default: false }),
  MAILGUN_API_KEY: str(),
}

const allEnv = envalid.cleanEnv(process.env, VARS, { dotEnvPath: '.env' })

const env = Object.keys(VARS).reduce((m, k) => {
  m[k] = allEnv[k]
  return m
}, {})

module.exports = Object.freeze({
  ...env,
})