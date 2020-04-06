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

  type TestSuccess {
    msg: String!
  }

  union TestResult = TestSuccess | Error

  type Query {
    test: TestResult!
  }
`

export const getFragmentMatcherConfig = () => ({
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: 'TestResult',
        possibleTypes: [
          {
            name: 'TestSuccess'
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
  TestResult: {
    __resolveType: ({ error }) => {
      return error ? 'Error' : 'TestSuccess'
    }
  },
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
})
