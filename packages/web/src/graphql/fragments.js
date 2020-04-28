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
