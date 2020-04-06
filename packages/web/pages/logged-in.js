import React from 'react'

import { useSafeQuery } from '../src/frontend/hooks'
import { withApollo } from '../src/frontend/hoc'
import { GetMyProfileQuery } from '../src/graphql/queries'
import Layout from '../src/frontend/components/Layout'

const LoggedInPage = () => {
  const { loading, data, error } = useSafeQuery(GetMyProfileQuery)

  return (
    <Layout>
      You are logged in!
      <div>{loading ? 'Loading ...' : null}</div>
      <div>{data ? JSON.stringify(data, null, 2) : null}</div>
      <div>{error ? `Error ${error.message}` : null}</div>
    </Layout>
  )
}

export default withApollo(LoggedInPage)


