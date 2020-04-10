export const middleware = () => next => async (req, res) => {
  try {
    await next(req, res)
    req.span.finish()
  } catch (err) {
    req.span.finishWithError(err)
    res.status(500)
    res.json({ error: err.message })
  }
}
