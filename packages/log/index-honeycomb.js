const Beeline = require('honeycomb-beeline')

const DUMMY_FN = () => {}

class Span {
  constructor (beeline, span) {
    this.beeline = beeline
    this.span = span
    this.childSpans = []
  }

  startSpan (task, attrs) {
    const span = new Span(this.beeline, this.beeline.startSpan({
      task,
      ...attrs
    }))

    this.childSpans.push(span)

    return span
  }

  addSpan (task, attrs, fn) {
    if (!fn) {
      fn = attrs
    }
    return this.beeline.withSpan({ task, ...attrs }, fn || DUMMY_FN)
  }

  async addAsyncSpan (task, attrs, asyncFn) {
    if (!asyncFn) {
      asyncFn = attrs
    }

    const span = this.startSpan(task, attrs)

    try {
      const ret = await asyncFn({ span })
      span.finish()
      return ret
    } catch (err) {
      span.finishWithError(`${task} error`, err)
      throw err
    }
  }

  addContext (attrs) {
    this.span.addContext(attrs)
  }

  finish () {
    if (!this.finished) {
      // spans work like a stack, and must be closed in reverse order
      // to how they were created, so we do our
      // children first just in case they haven't yet been closed!
      this.childSpans.forEach(childSpan => {
        childSpan.finish()
      })

      this._finishMyself()

      this.finished = true
    }
  }

  finishWithError (msg, err) {
    this.beeline.withSpan({ msg, error: `${err}` }, DUMMY_FN)
    this.finish()
  }

  _finishMyself () {
    this.beeline.finishSpan(this.span)
  }
}


class Trace extends Span {
  _finishMyself () {
    this.beeline.finishTrace(this.span)
  }
}

class Tracer {
  constructor (opts) {
    this.beeline = Beeline({
      ...opts,
      enabledInstrumentations: [ 'http', 'https', 'pg' ],
    })

    this.beeline.customContext.add('namespace', opts.namspace)
  }

  startTrace (task, attrs) {
    return new Trace(this.beeline, this.beeline.startTrace({
      task,
      ...attrs
    }))
  }
}


exports.createTracer = ({ config, namespace }) => {
  return new Tracer({
    namespace,
    writeKey: config.CLOUDTRACE_API_KEY,
    dataset: config.CLOUDTRACE_DATASET,
    transmission: config.CLOUDTRACE_CONSOLE ? 'writer' : 'base',
  })
}
