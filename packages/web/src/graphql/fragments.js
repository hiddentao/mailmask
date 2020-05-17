import gql from 'graphql-tag'

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    error {
      code
      message
    }
  }
`



export const SuccessFragment = gql`
  fragment SuccessFragment on Success {
    success
  }
`


export const SubscriptionFragment = gql`
  fragment SubscriptionFragment on Subscription {
    id
    createdAt
    plan
    schedule
    status
    nextPaymentAmount
    nextPaymentDate
  }
`



export const RequestLoginLinkResultFragment = gql`
  ${SuccessFragment}
  ${ErrorFragment}

  fragment RequestLoginLinkResultFragment on RequestLoginLinkResult {
    ...on Success {
      ...SuccessFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`


export const CompleteSignupResultFragment = gql`
  ${SuccessFragment}
  ${ErrorFragment}

  fragment CompleteSignupResultFragment on CompleteSignupResult {
    ...on Success {
      ...SuccessFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`



export const UpdateMaskStatusResultFragment = gql`
  ${SuccessFragment}
  ${ErrorFragment}

  fragment UpdateMaskStatusResultFragment on UpdateMaskStatusResult {
    ...on Success {
      ...SuccessFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`



export const DeleteAccountResultFragment = gql`
  ${SuccessFragment}
  ${ErrorFragment}

  fragment DeleteAccountResultFragment on DeleteAccountResult {
    ...on Success {
      ...SuccessFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`



export const PreparePlanResultFragment = gql`
  ${SubscriptionFragment}
  ${ErrorFragment}

  fragment PreparePlanResultFragment on PreparePlanResult {
    ...on Subscription {
      ...SubscriptionFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`



export const UserProfileFragment = gql`
  ${SubscriptionFragment}

  fragment UserProfileFragment on UserProfile {
    id
    email
    usernames {
      id
      username
      email
    }
    sub {
      ...SubscriptionFragment
    }
    legal {
      id
      type
      version
      accepted
    }
  }
`


export const UserProfileResultFragment = gql`
  ${UserProfileFragment}
  ${ErrorFragment}

  fragment UserProfileResultFragment on UserProfileResult {
    ...on UserProfile {
      ...UserProfileFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`



export const UsernameAvailabilityFragment = gql`
  fragment UsernameAvailabilityFragment on UsernameAvailability {
    available
  }
`


export const UsernameAvailabilityResultFragment = gql`
  ${UsernameAvailabilityFragment}
  ${ErrorFragment}

  fragment UsernameAvailabilityResultFragment on UsernameAvailabilityResult {
    ...on UsernameAvailability {
      ...UsernameAvailabilityFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`


export const PagedResultFragment = gql`
  fragment PagedResultFragment on PagedResult {
    page
    totalResults
    numPages
  }
`


export const MaskFragment = gql`
  fragment MaskFragment on Mask {
    name
    enabled
    username {
      id
      username
      email
    }
    stats {
      period
      numBytes
      numMessages
      lastReceived
    }
  }
`


export const MaskListFragment = gql`
  ${PagedResultFragment}
  ${MaskFragment}

  fragment MaskListFragment on MaskList {
    items {
      ...MaskFragment
    }
    paging {
      ...PagedResultFragment
    }
  }
`


export const MaskListResultFragment = gql`
  ${MaskListFragment}
  ${ErrorFragment}

  fragment MaskListResultFragment on MaskListResult {
    ...on MaskList {
      ...MaskListFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`


export const MonthlyStatsFragment = gql`
  fragment MonthlyStatsFragment on MonthlyStats {
    maskStats {
      period
      numBytes
      numMessages
      lastReceived
    }
  }
`


export const MonthlyStatsResultFragment = gql`
  ${MonthlyStatsFragment}
  ${ErrorFragment}

  fragment MonthlyStatsResultFragment on MonthlyStatsResult {
    ...on MonthlyStats {
      ...MonthlyStatsFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`
