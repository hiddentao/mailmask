// Based on https://github.com/lfades/next-with-apollo
import withApolloBase from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import { createApolloClient } from '../../graphql'
import { getAppConfig, isBrowser } from '../appConfig'

const { BASE_URL } = getAppConfig()

export const withApollo = withApolloBase(
  ({ initialState }) => {
    return createApolloClient({
      endpoint: `${BASE_URL}/api/graphql`,
      name: isBrowser ? 'cml-browser' : 'cml-server',
      initialState,
    })
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    }
  }
)
