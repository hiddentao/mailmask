const { /* encrypt, */ decrypt } = require('./crypto')
const { REPLY_USERNAME } = require('./constants')

exports.createReplyAddressPrefix = async ({ mask, username, replyTo, fromUser }) => {
  const replyToSanitized = replyTo.replace('@', '[at]')
  return `${mask}-${username}-${replyToSanitized}-${fromUser ? 1 : 0}`
  // return encrypt({ username, mask, replyTo, fromUser }, config)
}


exports.decodeReplyAddressPrefix = async (str, config) => {
  try {
    if (str.indexOf('[at]')) {
      const [ mask, username, replyToSanitized, fromUserInt ] = str.split('-')
      const replyTo = replyToSanitized.replace('[at]', '@')
      const fromUser = ('1' === fromUserInt)
      return { mask, username, replyTo, fromUser }
    } else {
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
