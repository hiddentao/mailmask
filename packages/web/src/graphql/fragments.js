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
