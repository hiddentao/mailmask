import { doBootstrap } from '../../../src/bootstrap'

const { wrapMiddleware, notifier } = doBootstrap()

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      await notifier.handleLink({ req, res })
      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default wrapMiddleware(endpoint)

