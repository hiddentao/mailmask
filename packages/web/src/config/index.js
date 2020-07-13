const { num, str, getConfig } = require('@mailmask/config')

module.exports = getConfig({
  vars: {
    LOGROCKET_ACCESS_TOKEN: str({ default: '' }),
    ROLLBAR_CLIENT_ACCESS_TOKEN: str({ default: '' }),
    ROLLBAR_SERVER_ACCESS_TOKEN: str({ default: '' }),
    PADDLE_VENDOR_ID: num({ default: 113077 }),
    PADDLE_AUTH_CODE: str(),
  },
  dotEnvPath: (process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development')
})
