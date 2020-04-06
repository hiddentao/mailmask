import { GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'
import gql from 'graphql-tag'

export const getTypeDefs = () => gql`
  scalar DateTime
  scalar JSON

  type ErrorDetails {
    code: String
    message: String
  }

  type Error {
    error: ErrorDetails
  }

  type RequestLoginLinkSuccess {
    success: Boolean
  }

  union RequestLoginLinkResult = RequestLoginLinkSuccess | Error

  type Mutation {
    requestLoginLink (email: String!): RequestLoginLinkResult!
  }

  type Query {
    dummy: Boolean
  }
`

export const getFragmentMatcherConfig = () => ({
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'RequestLoginLinkResult',
        possibleTypes: [
          {
            name: 'RequestLoginLinkSuccess'
          },
          {
            name: 'Error'
          },
        ]
      },
    ]
  }
})


export const getDefaultResolvers = () => ({
  RequestLoginLinkResult: {
    __resolveType: ({ error }) => {
      return error ? 'Error' : 'RequestLoginLinkSuccess'
    }
  },
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
})
