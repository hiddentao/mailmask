const envalid = require('envalid')

const { str, num, bool } = envalid

const VARS = {
  DOMAIN: str({ default: 'msk.sh' }),
  APP_MODE: str({ default: 'development' }),
  SMTP_TESTMODE: bool({ default: false }),
  LOG_LEVEL: str({ default: 'DEBUG' }),
  DB_HOST: str({ default: '' }),
  DB_PORT: num({ default: 0 }),
  DB_USERNAME: str({ default: '' }),
  DB_PASSWORD: str({ default: '' }),
  MAILGUN_API_KEY: str(),
}

exports.str = str
exports.num = num
exports.bool = bool

exports.getConfig = ({ vars, dotEnvPath = '.env' } = {}) => {
  const allEnv = envalid.cleanEnv(process.env, {
    ...VARS,
    ...vars
  }, { dotEnvPath })

  const env = Object.keys(VARS).reduce((m, k) => {
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



msk.sh
msk.ac

