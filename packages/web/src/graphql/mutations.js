import gql from 'graphql-tag'

import {
  RequestLoginLinkResultFragment,
  SetUsernameResultFragment,
  UpdateMaskStatusResultFragment,
  DeleteAccountResultFragment,
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



export const UpdateMaskStatusMutation = gql`
  ${UpdateMaskStatusResultFragment}

  mutation UpdateMaskStatus ($name: String!, $enabled: Boolean!) {
    result: updateMaskStatus (name: $name, enabled: $enabled) {
      ...UpdateMaskStatusResultFragment
    }
  }
`



export const DeleteAccountMutation = gql`
  ${DeleteAccountResultFragment}

  mutation DeleteAccount {
    result: deleteAccount {
      ...DeleteAccountResultFragment
    }
  }
`

