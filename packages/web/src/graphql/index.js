import { ApolloClient } from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { makeExecutableSchema } from 'graphql-tools'

import { getTypeDefs, getFragmentMatcherConfig } from './typedefs'
import createLinks from './links'
import { stringifyError, resolveError } from './errors'
import createResolvers from './resolvers'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: getFragmentMatcherConfig()
})

export const createSchema = args => {
  return makeExecutableSchema({
    typeDefs: getTypeDefs(),
    resolvers: createResolvers(args),
  })
}

export const createApolloClient = ({ endpoint, name, initialState = {} }) => {
  const cache = new InMemoryCache({ fragmentMatcher }).restore(initialState)

  const client = new ApolloClient({
    name,
    cache,
    typeDefs: getTypeDefs(),
    link: createLinks({ cache, endpoint }),
  })

  client.safeQuery = async (...args) => {
    let ret
    let error

    try {
      ret = await client.query(...args)
    } catch (err) {
      error = err
    }

    if (!error) {
      error = resolveError(ret)
    }

    if (error) {
      const e = new Error(stringifyError(error))
      e.code = error.code
      throw e
    }

    return ret
  }

  client.safeMutate = async (...args) => {
    let ret
    let error

    try {
      ret = await client.mutate(...args)
    } catch (err) {
      error = err
    }

    if (!error) {
      error = resolveError(ret)
    }

    if (error) {
      const e = new Error(stringifyError(error))
      e.code = error.code
      throw e
    }

    return ret
  }

  return client
}
