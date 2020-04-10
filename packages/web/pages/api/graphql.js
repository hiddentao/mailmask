import { renderPlaygroundPage } from '@apollographql/graphql-playground-html'
import { convertNodeHttpToRequest, runHttpQuery } from 'apollo-server-core'
import { _ } from '@camomail/utils'

import { createSchema } from '../../src/graphql'
import { doBootstrap } from '../../src/bootstrap'

const { wrapMiddleware, ...server } = doBootstrap()

const graphqlOptions = {
  schema: createSchema(server),
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
      const user = _.get(req, 'session.id') ? req.session : null

      await req.span.withAsyncSpan(
        'run query',
        {
          user: _.get(user, 'id', 'not logged in'),
        },
        async ({ span }) => {
          // Code based on https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-koa/src/koaApollo.ts
          try {
            const { operationName, variables } = req.body

            span.addFields({
              operationName,
              variables: JSON.stringify(variables, null, 2)
            })

            const { graphqlResponse, responseInit } = await runHttpQuery([ req, res ], {
              method: req.method,
              options: {
                ...graphqlOptions,
                context: {
                  setUser: res.setUser,
                  span,
                  user,
                },
              },
              query: req.body,
              request: convertNodeHttpToRequest(req),
            })

            Object.keys(responseInit.headers).forEach(key => {
              res.setHeader(key, responseInit.headers[key])
            })

            res.end(graphqlResponse)

            span.finish()
          } catch (error) {
            span.finishWithError(error)

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
        }
      )
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

export default wrapMiddleware(endpoint)
