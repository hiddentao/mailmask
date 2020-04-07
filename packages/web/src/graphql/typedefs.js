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

  type Success {
    success: Boolean
  }

  type UserProfile {
    id: ID!
    email: String!
    username: String!
    signedUp: Boolean!
    createdAt: DateTime!
  }

  type UsernameAvailability {
    available: Boolean
  }

  union RequestLoginLinkResult = Success | Error
  union SetUsernameResult = Success | Error
  union UserProfileResult = UserProfile | Error
  union UsernameAvailabilityResult = UsernameAvailability | Error

  type Mutation {
    requestLoginLink (email: String!): RequestLoginLinkResult!
    setUsername (username: String!): SetUsernameResult!
  }

  type Query {
    getMyProfile: UserProfileResult!
    getUsernameAvailability (username: String!): UsernameAvailabilityResult!
  }
`

const UNIONS = [
  [ 'RequestLoginLinkResult', 'Success' ],
  [ 'SetUsernameResult', 'Success' ],
  [ 'UserProfileResult', 'UserProfile' ],
  [ 'UsernameAvailabilityResult', 'UsernameAvailability' ]
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



