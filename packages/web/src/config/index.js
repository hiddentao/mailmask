const { str, getConfig } = require('@mailmask/config')

module.exports = getConfig({
  vars: {
    ENCRYPTION_KEY: str(),
    ENCRYPTION_IV: str(),
  }
})
