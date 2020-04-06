import gql from 'graphql-tag'

import {
  TestResultFragment,
} from './fragments'


export const TestQuery = gql`
  ${TestResultFragment}

  query test {
    result: test {
      ...TestResultFragment
    }
  }
`
