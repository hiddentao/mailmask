const slug = require('slugify')
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
 * obfuscate('ok test@me.com') // ok t***@m*.c**
 *
 * @param  {String} str Input
 * @return {String}
 */
exports.obfuscate = str => {
  if (emailAddresses.parseOneAddress(str)) {
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


exports.generateVerificationCode = len => {
  let str = ''

  for (let i = 0; len > i; i += 1) {
    str = `${str}${parseInt(Math.random() * 10, 10)}`
  }

  return str
}

exports.parseEmailAddressList = str => {
  return emailAddresses.parseAddressList(str)
}

exports.parseEmailAddress = str => {
  return emailAddresses.parseOneAddress(str)
}


exports.parseMaskEmailAddress = a => {
  const atPos = a.indexOf('@')
  const firstDotPos = a.substr(atPos).indexOf('.')
  const username = a.substr(atPos + 1, firstDotPos - 1).toLowerCase()
  const mask = a.substr(0, atPos).toLowerCase()
  return { username, mask }
}


exports.buildMaskAddress = (mask, username, domain) => `${mask}@${username}.${domain}`


exports.isValidEmail = a => emailAddresses.parseOneAddress(a)


const USERNAME_REGEX = /^[A-Za-z0-9\-]{3,16}$/

exports.isValidUsername = n => n && !!n.match(USERNAME_REGEX)

