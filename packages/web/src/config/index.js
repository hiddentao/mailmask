const { num, str, getConfig } = require('@mailmask/config')

module.exports = getConfig({
  vars: {
    PADDLE_VENDOR_ID: num({ default: 113077 }),
    PADDLE_AUTH_CODE: str(),
    ENCRYPTION_KEY: str(),
    ENCRYPTION_IV: str(),
  }
})
