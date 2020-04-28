import gql from 'graphql-tag'

import {
  RequestLoginLinkResultFragment,
  CompleteSignupResultFragment,
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



export const CompleteSignupMutation = gql`
  ${CompleteSignupResultFragment}

  mutation CompleteSignupMutation ($signUp: SignUpInput!) {
    result: completeSignup (signUp: $signUp) {
      ...CompleteSignupResultFragment
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

