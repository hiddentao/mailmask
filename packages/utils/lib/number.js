/*
 * Assuming 59 KB for standard emails (http://answers.google.com/answers/threadview?id=312463)
 */
// eslint-disable-next-line no-bitwise
exports.calculateEmailsForBandwidthMb = b => ~~(b * 1024 / 59)

exports.toPrettyNumberString = (a, opts) => new Intl.NumberFormat('en-US', opts).format(a)

const KILOBYTE = 1024
const MEGABYTE = 1024 * KILOBYTE

exports.bytesToBandwidthStr = v => {
  if (KILOBYTE > v) {
    return `${v || 0} bytes`
  } else if (MEGABYTE > v) {
    return `${(v / KILOBYTE).toFixed(1)} KB`
  } else {
    return `${(v / MEGABYTE).toFixed(1)} MB`
  }
}
