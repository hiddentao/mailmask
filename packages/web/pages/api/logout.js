import { doBootstrap } from '../../src/bootstrap'

const { wrapMiddleware } = doBootstrap()

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      req.span.recordEvent('logout')

      await res.setUser({})

      res.writeHead(301, {
        Location: '/'
      })

      res.end()
      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default wrapMiddleware(endpoint)

