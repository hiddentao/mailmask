const { /* encrypt, */ decrypt } = require('./crypto')
const { REPLY_USERNAME } = require('./constants')

const AT_REPLACEMENT = '__AT__'

exports.createReplyAddressPrefix = async ({ mask, username, replyTo, fromUser }) => {
  const replyToSanitized = replyTo.replace('@', AT_REPLACEMENT)
  return `${replyToSanitized}-${mask}-${username}-${fromUser ? 1 : 0}`

  // old method: return encrypt({ username, mask, replyTo, fromUser }, config)
}


exports.decodeReplyAddressPrefix = async (str, config) => {
  try {
    if (str.indexOf(AT_REPLACEMENT)) {
      const [ replyToSanitized, mask, username, fromUserInt ] = str.split('-')
      const replyTo = replyToSanitized.replace(AT_REPLACEMENT, '@')
      const fromUser = ('1' === fromUserInt)
      return { mask, username, replyTo, fromUser }
    } else {
      // old method
      const { mask, username, replyTo, fromUser } = await decrypt(str, config)
      return { mask, username, replyTo, fromUser }
    }
  } catch (err) {
    return {}
  }
}


exports.isReservedUsername = (str = '') => {
  return str.toLowerCase() === REPLY_USERNAME.toLowerCase()
}
