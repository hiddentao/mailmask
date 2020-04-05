import { makeExecutableSchema } from 'graphql-tools'
import { getTypeDefs } from '@solui/graphql'

import createResolvers from './resolvers'

export const createSchema = args => {
  return makeExecutableSchema({
    typeDefs: getTypeDefs(),
    resolvers: createResolvers(args),
  })
}
