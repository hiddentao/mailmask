import { doBootstrap } from '../../src/bootstrap'
import { redirectToPage } from '../../src/utils/functions'

const { wrapMiddleware } = doBootstrap()

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      await res.setUser({})

      redirectToPage({ res }, '/')

      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default wrapMiddleware(endpoint)

