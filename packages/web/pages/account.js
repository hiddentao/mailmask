import React from 'react'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import AuthenticatedAndFullySignedUp from '../src/frontend/components/AuthenticatedAndFullySignedUp'

const AccountPage = () => {
  return (
    <Layout>
      <AuthenticatedAndFullySignedUp>
        My account!
      </AuthenticatedAndFullySignedUp>
    </Layout>
  )
}

export default withApollo(AccountPage)


