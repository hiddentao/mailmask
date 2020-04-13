const opentelemetry = require('@opentelemetry/api')

const {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} = require('@opentelemetry/tracing')

const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')

class Span {
  constructor (tracer, span) {
    this.tracer = tracer
    this.span = span
    this.childSpans = []
  }

  recordEvent (name, attributes = {}) {
    this.span.addEvent(name, attributes)
  }

  addFields (attributes = {}) {
    this.span.setAttributes(attributes)
  }

  startSpan (task, attributes = {}) {
    const span = new Span(
      this.tracer,
      this.tracer.startSpan(task, { attributes, parent: this.span })
    )

    this.childSpans.push(span)

    return span
  }

  withSpan (task, attributes = {}, fn) {
    if (!fn) {
      fn = attributes
    }

    const s = this.startSpan(task, attributes)

    try {
      const ret = fn({ span: s })
      s.finish()
      return ret
    } catch (err) {
      s.finishWithError(err)
      throw err
    }
  }

  async withAsyncSpan (task, attributes = {}, asyncFn) {
    if (!asyncFn) {
      asyncFn = attributes
    }

    const s = this.startSpan(task, attributes)

    try {
      const ret = await asyncFn({ span: s })
      s.finish()
      return ret
    } catch (err) {
      s.finishWithError(err)
      throw err
    }
  }

  finish () {
    if (!this.finished) {
      // spans work like a stack, and must be closed in reverse order
      // to how they were created, so we do our
      // children first just in case they haven't yet been closed!
      this.childSpans.forEach(childSpan => {
        childSpan.finish()
      })

      this.span.end()

      this.finished = true
    }
  }

  finishWithError (error) {
    if (!this.finished) {
      console.error(error)
      this.recordEvent('error', { error })
      this.span.setStatus(opentelemetry.CanonicalCode.INTERNAL)
      this.finish()
    }
  }
}


class Tracer {
  constructor (opts) {
    this._provider = new BasicTracerProvider()

    // Configure span processor to send spans to the exporter
    if (opts.sendToConsole) {
      this._provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
    }

    if (opts.sendToCloud) {
      this._provider.addSpanProcessor(new BatchSpanProcessor(new ZipkinExporter({
        url: opts.cloudEndpoint,
        serviceName: opts.serviceName
      })))
    }

    this._provider.register()
  }

  recordGlobalError (name, attributes = {}) {
    const s = opentelemetry.trace.getTracer('globalError').startSpan(name, { attributes })
    s.end()
  }

  startTrace (name, attributes = {}) {
    if (!attributes.type) {
      throw new Error('"type" attribute must be set for trace')
    }

    const t = opentelemetry.trace.getTracer(name)

    const span = new Span(t, t.startSpan(name, { attributes }))

    return span
  }
}


exports.createTracer = (serviceName, { config }) => {
  return new Tracer({
    serviceName,
    cloudEndpoint: config.TRACE_CLOUD_ENDPOINT,
    sendToConsole: config.TRACE_CONSOLE_ENABLED,
    sendToCloud: config.TRACE_CLOUD_ENABLED,
  })
}
