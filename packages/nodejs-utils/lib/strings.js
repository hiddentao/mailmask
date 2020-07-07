const { encrypt, decrypt } = require('./crypto')
const { REPLY_USERNAME } = require('./constants')

exports.createReplyAddressPrefix = async ({ mask, username, replyTo, fromUser }, config) => {
  return encrypt({ username, mask, replyTo, fromUser }, config)
}


exports.decodeReplyAddressPrefix = async (str, config) => {
  try {
    const { mask, username, replyTo, fromUser } = await decrypt(str, config)
    return { mask, username, replyTo, fromUser }
  } catch (err) {
    return {}
  }
}


exports.isReservedUsername = (str = '') => {
  return str.toLowerCase() === REPLY_USERNAME.toLowerCase()
}
