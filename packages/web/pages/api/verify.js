import { doBootstrap } from '../../src/bootstrap'
import { buildUrlPath } from '../../src/utils/url'

const { wrapMiddleware, notifier } = doBootstrap()

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      req.span.recordEvent('handle notifier link')

      const { v: token, code } = req.query

      await notifier.handleVerification({
        span: req.span,
        setSessionUser: res.setUser,
        redirectTo: pathUrl => {
          res.status(302)
          res.setHeader('Location', buildUrlPath(pathUrl))
          res.end(`Redirect to: ${pathUrl}`)
        }
      }, {
        token,
        code
      })

      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default wrapMiddleware(endpoint)

