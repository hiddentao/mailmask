// Based on https://github.com/lfades/next-with-apollo
import withApolloBase from 'next-with-apollo'
import { ApolloProvider } from '@apollo/react-hooks'

import { createApolloClient } from '../../graphql/client'

export const withApollo = withApolloBase(
  ({ initialState }) => {
    return createApolloClient({
      endpoint: `/api/graphql`,
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
