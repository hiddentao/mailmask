import gql from 'graphql-tag'

import {
  UserProfileResultFragment,
  UsernameAvailabilityResultFragment,
  MaskListResultFragment,
  MonthlyStatsResultFragment,
} from './fragments'


export const GetMyMonthlyStatsQuery = gql`
  ${MonthlyStatsResultFragment}

  query GetMyMonthlyStats {
    result: getMyMonthlyStats {
      ...MonthlyStatsResultFragment
    }
  }
`


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
