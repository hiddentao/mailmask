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

  type UserProfile {
    id: ID!
    email: String!
    username: String!
    createdAt: DateTime!
  }

  union RequestLoginLinkResult = RequestLoginLinkSuccess | Error
  union UserProfileResult = UserProfile | Error

  type Mutation {
    requestLoginLink (email: String!): RequestLoginLinkResult!
  }

  type Query {
    getMyProfile: UserProfileResult!
  }
`

const UNIONS = [
  [ 'RequestLoginLinkResult', 'RequestLoginLinkSuccess' ],
  [ 'UserProfileResult', 'UserProfile' ]
]

export const getFragmentMatcherConfig = () => ({
  __schema: {
    types: UNIONS.map(([ ResultTypeDef, SuccessTypeDef ]) => ({
      kind: 'UNION',
      name: ResultTypeDef,
      possibleTypes: [
        {
          name: SuccessTypeDef
        },
        {
          name: 'Error'
        },
      ]
    }))
  }
})


export const getDefaultResolvers = () => ({
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  ...UNIONS.reduce((m, [ ResultTypeDef, SuccessTypeDef ]) => {
    m[ResultTypeDef] = {
      __resolveType: ({ error }) => {
        return error ? 'Error' : SuccessTypeDef
      }
    }
    return m
  }, {}),
})



