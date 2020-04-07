import React from 'react'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'

const AccountPage = () => {
  return (
    <Layout>
      My account!
    </Layout>
  )
}

export default withApollo(AccountPage)


