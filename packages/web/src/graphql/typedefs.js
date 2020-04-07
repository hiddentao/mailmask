import { GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'
import gql from 'graphql-tag'

export const getTypeDefs = () => gql`
  scalar DateTime
  scalar JSON

  type PagedResult {
    page: Int!
    totalResults: Int!
    numPages: Int!
  }

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

  type Mask {
    name: String!
    enabled: Boolean!
  }

  type MaskList {
    items: [Mask]!
    paging: PagedResult!
  }

  input PagingInput {
    page: Int
    resultsPerPage: Int
  }

  union RequestLoginLinkResult = Success | Error
  union SetUsernameResult = Success | Error
  union UpdateMaskStatusResult = Success | Error
  union DeleteAccountResult = Success | Error
  union UserProfileResult = UserProfile | Error
  union UsernameAvailabilityResult = UsernameAvailability | Error
  union MaskListResult = MaskList | Error

  type Mutation {
    requestLoginLink (email: String!): RequestLoginLinkResult!
    setUsername (username: String!): SetUsernameResult!
    updateMaskStatus (name: String!, enabled: Boolean!): UpdateMaskStatusResult!
    deleteAccount: DeleteAccountResult!
  }

  type Query {
    getMyProfile: UserProfileResult!
    getMyMasks (paging: PagingInput!): MaskListResult!
    getUsernameAvailability (username: String!): UsernameAvailabilityResult!
  }
`

const UNIONS = [
  [ 'RequestLoginLinkResult', 'Success' ],
  [ 'SetUsernameResult', 'Success' ],
  [ 'UpdateMaskStatusResult', 'Success' ],
  [ 'DeleteAccountResult', 'Success' ],
  [ 'UserProfileResult', 'UserProfile' ],
  [ 'UsernameAvailabilityResult', 'UsernameAvailability' ],
  [ 'MaskListResult', 'MaskList' ],
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



