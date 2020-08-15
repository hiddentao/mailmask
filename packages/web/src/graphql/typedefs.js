import { GraphQLDateTime } from 'graphql-iso-date'
import GraphQLJSON from 'graphql-type-json'
import gql from 'graphql-tag'

export const getTypeDefs = () => gql`
  scalar DateTime
  scalar JSON

  enum PlanType {
    BASIC
    PREMIUM
    PRO
  }

  enum ScheduleType {
    MONTHLY
    YEARLY
  }

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

  type Subscription {
    id: ID!
    createdAt: DateTime!
    plan: PlanType!
    schedule: ScheduleType!
    status: String!
    nextPaymentAmount: String
    nextPaymentDate: DateTime
  }

  type LegalAgreement {
    id: ID!
    type: String!
    version: Int!
    accepted: DateTime!
  }

  type Username {
    id: ID!
    username: String!
    email: String!
  }

  type UserProfile {
    id: ID!
    email: String!
    sub: Subscription
    usernames: [Username]
    legal: [LegalAgreement]
  }

  type UsernameAvailability {
    available: Boolean
  }

  type MaskStats {
    period: String!
    numBytes: Int
    numMessages: Int
    lastReceived: DateTime
  }

  type Mask {
    name: String!
    enabled: Boolean!
    username: Username!
    stats: MaskStats
  }

  type MaskList {
    items: [Mask]!
    paging: PagedResult!
  }

  type MonthlyStats {
    maskStats: MaskStats!
  }

  type GlobalStats {
    numBlocked: Int!
    numUsers: Int!
  }

  type LoginLinkRequestState {
    token: String!
    isSignup: Boolean!
  }

  input SignUpInput {
    username: String!
  }

  input PagingInput {
    page: Int
    resultsPerPage: Int
  }

  input LoginLinkRequestInput {
    email: String!
    plan: PlanType
    schedule: ScheduleType
  }

  input VerifyCodeRequestInput {
    token: String!
    code: String!
  }

  input PreparePlanRequestInput {
    plan: PlanType!
    schedule: ScheduleType!
  }

  union RequestLoginLinkResult = LoginLinkRequestState | Error
  union CompleteSignupResult = Success | Error
  union VerifyCodeResult = Success | Error
  union UpdateMaskStatusResult = Success | Error
  union PreparePlanResult = Subscription | Error
  union DeleteAccountResult = Success | Error
  union UserProfileResult = UserProfile | Error
  union UsernameAvailabilityResult = UsernameAvailability | Error
  union MaskListResult = MaskList | Error
  union MonthlyStatsResult = MonthlyStats | Error
  union GlobalStatsResult = GlobalStats | Error

  type Mutation {
    requestLoginLink (loginLinkRequest: LoginLinkRequestInput!): RequestLoginLinkResult!
    verifyCode (verifyCodeRequest: VerifyCodeRequestInput!): VerifyCodeResult!
    completeSignup (signUp: SignUpInput!): CompleteSignupResult!
    preparePlan (preparePlanRequest: PreparePlanRequestInput!): PreparePlanResult!
    updateMaskStatus (name: String!, enabled: Boolean!): UpdateMaskStatusResult!
    deleteAccount: DeleteAccountResult!
  }

  type Query {
    getGlobalStats: GlobalStatsResult!
    getMyProfile: UserProfileResult!
    getMyMasks (paging: PagingInput!): MaskListResult!
    getMyMonthlyStats: MonthlyStatsResult!
    getUsernameAvailability (username: String!): UsernameAvailabilityResult!
  }
`

const UNIONS = [
  [ 'RequestLoginLinkResult', 'LoginLinkRequestState' ],
  [ 'VerifyCodeResult', 'Success' ],
  [ 'CompleteSignupResult', 'Success' ],
  [ 'UpdateMaskStatusResult', 'Success' ],
  [ 'DeleteAccountResult', 'Success' ],
  [ 'PreparePlanResult', 'Subscription' ],
  [ 'UserProfileResult', 'UserProfile' ],
  [ 'GlobalStatsResult', 'GlobalStats' ],
  [ 'UsernameAvailabilityResult', 'UsernameAvailability' ],
  [ 'MaskListResult', 'MaskList' ],
  [ 'MonthlyStatsResult', 'MonthlyStats' ],
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



