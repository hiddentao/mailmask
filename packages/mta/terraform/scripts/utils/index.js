const shell = require('shelljs')
const path = require('path')

exports.TFVARS_JSON_PATH = path.join(__dirname, '..', '..', 'secrets.tfvars.json')
exports.TFVARS_ENC_PATH = path.join(__dirname, '..', '..', 'secrets.enc')

exports.exec = cmd => {
  const ret = shell.exec(cmd, { silent: true })

  if (ret.code !== 0) {
    console.error(ret.stdout)
    console.error(ret.stderr)
    throw new Error(`Failed: ${cmd}`)
  }

  return ret.stdout.trim()
}
