const slug = require('slugify')
const validator = require('validator')
const { uuid } = require('uuidv4')
const emailAddresses = require('email-addresses')

/**
 * Obfuscate given string.
 *
 * This replaces most characters in the string with the `*` character, and
 * intelligently handles email addresses such that their general structure
 * is left untouched.
 *
 * @example
 *
 * obfuscate('password') // p*******
 * obfuscate('test@me.com') // t***@m*.c**
 *
 * @param  {String} str Input
 * @return {String}
 */
exports.obfuscate = str => {
  if (validator.isEmail(str)) {
    const [ name, at ] = str.split('@')
    const domain = at.split('.')
    return `${exports.obfuscate(name)}@${domain.map(exports.obfuscate).join('.')}`
  } else {
    const strLen = str.length
    if (1 < strLen) {
      return str.charAt(0) + '*'.repeat(strLen - 1)
    } else {
      return '*'
    }
  }
}

exports.slugify = str => slug(str)


exports.randStr = (numChars = 8) => {
  return uuid().substr(0, numChars)
}


exports.extractEmailAddress = str => {
  const { address } = emailAddresses.parseOneAddress(str)
  return address
}


exports.parseMaskEmailAddress = a => {
  const atPos = a.indexOf('@')
  const firstDotPos = a.substr(atPos).indexOf('.')
  const username = a.substr(atPos + 1, firstDotPos - 1).toLowerCase()
  const mask = a.substr(0, atPos).toLowerCase()
  return { username, mask }
}


exports.buildMaskAddress = (mask, username, domain) => `${mask}@${username}.${domain}`


exports.isValidEmail = a => validator.isEmail(a)


const USERNAME_REGEX = /^[A-Za-z0-9\-]{3,16}$/

exports.isValidUsername = n => n && !!n.match(USERNAME_REGEX)
