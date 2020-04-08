import React from 'react'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import GetStartedForm from '../src/frontend/components/GetStartedForm'

const LoginPage = () => {
  return (
    <Layout>
      <h1>Login</h1>
      <GetStartedForm />
    </Layout>
  )
}

export default withApollo(LoginPage)


