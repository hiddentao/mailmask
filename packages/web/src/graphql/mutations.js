import gql from 'graphql-tag'

import {
  RequestLoginLinkResultFragment,
  SetUsernameResultFragment,
} from './fragments'


export const RequestLoginLinkMutation = gql`
  ${RequestLoginLinkResultFragment}

  mutation RequestLoginLink ($email: String!) {
    result: requestLoginLink (email: $email) {
      ...RequestLoginLinkResultFragment
    }
  }
`



export const SetUsernameMutation = gql`
  ${SetUsernameResultFragment}

  mutation SetUsername ($username: String!) {
    result: setUsername (username: $username) {
      ...SetUsernameResultFragment
    }
  }
`
