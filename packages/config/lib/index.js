const envalid = require('envalid')

const { str, num, bool } = envalid

const VARS = {
  DOMAIN: str({ default: 'msk.sh' }),
  SUPPORT_EMAIL: str({ default: 'support@msk.sh' }),
  APP_MODE: str({ default: 'development' }),
  SMTP_TESTMODE: bool({ default: false }),
  DB_HOST: str({ default: '' }),
  DB_PORT: num({ default: 0 }),
  DB_USERNAME: str({ default: '' }),
  DB_PASSWORD: str({ default: '' }),
  TRACE_CLOUD_ENABLED: bool({ default: true }),
  TRACE_CONSOLE_ENABLED: bool({ default: false }),
  TRACE_CLOUD_ENDPOINT: str({ default: 'http://localhost:9411/api/v2/spans' }),
  MAILGUN_API_KEY: str(),
}

exports.str = str
exports.num = num
exports.bool = bool

exports.getConfig = ({ vars, dotEnvPath = '.env' } = {}) => {
  const finalVars = { ...VARS, ...vars }

  const allEnv = envalid.cleanEnv(process.env, finalVars, { dotEnvPath })

  const env = Object.keys(finalVars).reduce((m, k) => {
    m[k] = allEnv[k]
    return m
  }, {})

  // eslint-disable-next-line import/no-dynamic-require
  const modeConfig = require(`./${env.APP_MODE}`)

  return Object.freeze({
    ...modeConfig,
    ...env,
  })
}



