import slug from 'slugify'
import validator from 'validator'

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
export const obfuscate = str => {
  if (validator.isEmail(str)) {
    const [ name, at ] = str.split('@')
    const domain = at.split('.')
    return `${obfuscate(name)}@${domain.map(obfuscate).join('.')}`
  } else {
    const strLen = str.length
    if (1 < strLen) {
      return str.charAt(0) + '*'.repeat(strLen - 1)
    } else {
      return '*'
    }
  }
}

export const slugify = str => slug(str)

