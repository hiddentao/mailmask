export const middleware = ({ log }) => next => async (req, res) => {
  try {
    await next(req, res)
  } catch (err) {
    log.error(err)
    res.status(500)
    res.json({ error: err.message })
  }
}
