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


export const SetUsernameResultFragment = gql`
  ${SuccessFragment}
  ${ErrorFragment}

  fragment SetUsernameResultFragment on SetUsernameResult {
    ...on Success {
      ...SuccessFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`



export const UserProfileFragment = gql`
  fragment UserProfileFragment on UserProfile {
    id
    email
    username
    signedUp
    createdAt
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
