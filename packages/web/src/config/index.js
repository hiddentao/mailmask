const { str, getConfig } = require('@camomail/config')

module.exports = getConfig({
  vars: {
    ENCRYPTION_KEY: str(),
    ENCRYPTION_IV: str(),
  }
})
