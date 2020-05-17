import gql from 'graphql-tag'

import {
  RequestLoginLinkResultFragment,
  CompleteSignupResultFragment,
  UpdateMaskStatusResultFragment,
  DeleteAccountResultFragment,
  PreparePlanResultFragment,
} from './fragments'



export const RequestLoginLinkMutation = gql`
  ${RequestLoginLinkResultFragment}

  mutation RequestLoginLink ($loginLinkRequest: LoginLinkRequestInput!) {
    result: requestLoginLink (loginLinkRequest: $loginLinkRequest) {
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



export const PreparePlanMutation = gql`
  ${PreparePlanResultFragment}

  mutation PreparePlanMutation ($preparePlanRequest: PreparePlanRequestInput!) {
    result: preparePlan (preparePlanRequest: $preparePlanRequest) {
      ...PreparePlanResultFragment
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

