import React from 'react'
import styled from '@emotion/styled'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import ContentWrapper from '../src/frontend/components/ContentWrapper'

const Heading = styled.h1`
  margin-bottom: 2rem;
`

const LoginPage = () => {
  return (
    <Layout>
      <Seo title='Login' />
      <ContentWrapper>
        <Heading>Login</Heading>
        <GetStartedForm buttonText='Login' />
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(LoginPage)


