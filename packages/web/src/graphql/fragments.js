import gql from 'graphql-tag'

export const ErrorFragment = gql`
  fragment ErrorFragment on Error {
    error {
      code
      message
    }
  }
`


export const TestSuccessFragment = gql`
  fragment TestSuccessFragment on TestSuccess {
    msg
  }
`


export const TestResultFragment = gql`
  ${TestSuccessFragment}
  ${ErrorFragment}

  fragment TestResultFragment on TestResult {
    ...on TestSuccess {
      ...TestSuccessFragment
    }
    ...on Error {
      ...ErrorFragment
    }
  }
`
