import gql from 'graphql-tag'

import {
  RequestLoginLinkResultFragment,
} from './fragments'


export const RequestLoginLinkMutation = gql`
  ${RequestLoginLinkResultFragment}

  mutation RequestLoginLinkQuery ($email: String!) {
    result: requestLoginLink (email: $email) {
      ...RequestLoginLinkResultFragment
    }
  }
`
