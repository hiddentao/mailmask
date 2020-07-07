import React from 'react'
import styled from '@emotion/styled'
import { _, SUB } from '@mailmask/utils'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import { DashboardLink } from '../src/frontend/components/Link'
import Authenticated from '../src/frontend/components/Authenticated'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import CompleteSignupForm from '../src/frontend/components/CompleteSignupForm'
import Button from '../src/frontend/components/Button'

const Heading = styled.h1`
  line-height: 1.3em;
  margin-bottom: 2rem;
`

const LoggedInPage = () => {
  return (
    <Layout>
      <Seo title='Logged-in' />
      <ContentWrapper>
        <Authenticated>
          {({ sub: { status } }) => (status !== SUB.STATUS.SELECTED ? (
            <div>
              <Heading>Welcome back! you are now logged in.</Heading>
              <DashboardLink><Button>View my dashboard</Button></DashboardLink>
            </div>
          ) : (
            <div>
              <Heading>Please set your username to finish signing up.</Heading>
              <CompleteSignupForm />
            </div>
          ))}
        </Authenticated>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(LoggedInPage)


