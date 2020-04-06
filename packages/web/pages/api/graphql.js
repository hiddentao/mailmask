import { renderPlaygroundPage } from '@apollographql/graphql-playground-html'
import { convertNodeHttpToRequest, runHttpQuery } from 'apollo-server-core'

import { middleware as ErrorWrapper } from '../../src/middleware/error'
import { createSchema } from '../../src/graphql'
import _ from '../../src/utils/lodash'
import appConfig from '../../src/config'
import { doBootstrap } from '../../src/bootstrap'

const { log, notifier } = doBootstrap({ config: appConfig })

const graphqlOptions = {
  schema: createSchema({ log, notifier, config: appConfig }),
}

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'OPTIONS': {
      res.status(204)
      res.end('')
      break
    }
    case 'GET': {
      res.status(200)
      res.setHeader('Content-Type', 'text/html')
      res.end(renderPlaygroundPage({
        endpoint: '/api/graphql',
        subscriptionEndpoint: '/api/graphql',
      }))
      break
    }
    case 'POST': {
      // Code based on https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-koa/src/koaApollo.ts
      try {
        const { graphqlResponse, responseInit } = await runHttpQuery([ req, res ], {
          method: req.method,
          options: {
            ...graphqlOptions,
            context: req.state,
          },
          query: req.body,
          request: convertNodeHttpToRequest(req),
        })

        Object.keys(responseInit.headers).forEach(key => {
          res.setHeader(key, responseInit.headers[key])
        })

        res.end(graphqlResponse)
      } catch (error) {
        if ('HttpQueryError' !== error.name) {
          throw error
        }

        if (error.headers) {
          Object.keys(error.headers).forEach(key => {
            res.setHeader(key, error.headers[key])
          })
        }

        res.status(error.statusCode)

        res.end(error.message)
      }
      break
    }
    default: {
      res.status(400)
      res.end('Bad request')
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16mb',
    },
  },
}

export default _.compose(ErrorWrapper({ log }))(endpoint)
