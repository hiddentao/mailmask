export const middleware = ({ tracer }) => next => async (req, res) => {
  if (!req.span) {
    req.span = tracer.startTrace('request', {
      type: 'request',
      method: req.method,
      url: req.url,
      httpVersion: req.httpVersion,
    })
  }

  await next(req, res)
}
