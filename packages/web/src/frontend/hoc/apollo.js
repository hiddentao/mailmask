// Based on https://github.com/lfades/next-with-apollo
import withApolloBase from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import { createApolloClient } from '../../graphql'
import { getAppConfig, isBrowser } from '../appConfig'

const { WEB_URL } = getAppConfig()

export const withApollo = withApolloBase(
  ({ initialState }) => {
    return createApolloClient({
      endpoint: `${WEB_URL}/api/graphql`,
      name: isBrowser ? 'mmk-browser' : 'mmk-server',
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
