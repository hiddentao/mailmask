import gql from 'graphql-tag'

import {
  UserProfileResultFragment,
  UsernameAvailabilityResultFragment,
  MaskListResultFragment,
} from './fragments'


export const GetMyProfileQuery = gql`
  ${UserProfileResultFragment}

  query GetMyProfile {
    result: getMyProfile {
      ...UserProfileResultFragment
    }
  }
`


export const GetUsernameAvailabilityQuery = gql`
  ${UsernameAvailabilityResultFragment}

  query GetUsernameAvailability ($username: String!) {
    result: getUsernameAvailability (username: $username) {
      ...UsernameAvailabilityResultFragment
    }
  }
`



export const GetMyMasksQuery = gql`
  ${MaskListResultFragment}

  query GetMyMasks ($paging: PagingInput!) {
    result: getMyMasks (paging: $paging) {
      ...MaskListResultFragment
    }
  }
`
