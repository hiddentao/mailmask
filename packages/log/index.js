const bunyan = require('bunyan')
const bformat = require('bunyan-format')

const formattedOutput = bformat({
  outputMode: 'short',
  color: true,
  colorFromLevel: true
})

class Log {
  constructor (opts) {
    this._opts = opts
    this._name = opts.name
    this._log = bunyan(opts)

    ;[ 'trace', 'debug', 'info', 'warn', 'error' ].forEach(fn => {
      this[fn] = (...args) => {
        const obj = {}

        // an error object should get passed through specially
        obj.err = args.find(a => a.stack && a.message)

        this._log[fn].call(this._log, ...([ obj ].concat(args)))
      }
    })
  }

  create (name) {
    return new Log({
      ...this._opts,
      name: `${this._name}/${name}`,
    })
  }
}

module.exports = (name, { level = 'info' } = {}) => {
  return new Log({
    name,
    streams: [
      {
        level,
        stream: formattedOutput,
      },
    ],
    serializers: {
      err: bunyan.stdSerializers.err
    },
  })
}
