import gql from 'graphql-tag'

import {
  UserProfileResultFragment,
  UsernameAvailabilityResultFragment,
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
