import gql from 'graphql-tag'

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    error {
      code
      message
    }
  }
`


export const RequestLoginLinkSuccessFragment = gql`
  fragment RequestLoginLinkSuccessFragment on RequestLoginLinkSuccess {
    success
  }
`


export const RequestLoginLinkResultFragment = gql`
  ${RequestLoginLinkSuccessFragment}
  ${ErrorFragment}

  fragment RequestLoginLinkResultFragment on RequestLoginLinkResult {
    ...on RequestLoginLinkSuccess {
      ...RequestLoginLinkSuccessFragment
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
