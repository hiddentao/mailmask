const { _, formatISO } = require('@mailmask/utils')

exports.tsStr = date => {
  return formatISO(date || new Date())
}
