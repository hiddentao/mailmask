import gql from 'graphql-tag'

import {
  UserProfileResultFragment,
} from './fragments'


export const GetMyProfileQuery = gql`
  ${UserProfileResultFragment}

  query GetMyProfile {
    result: getMyProfile {
      ...UserProfileResultFragment
    }
  }
`
