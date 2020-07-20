import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { _ } from '@mailmask/utils'

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
  const router = useRouter()

  const allDone = useCallback(() => {
    router.replace('/post-signup')
  }, [ router ])

  return (
    <Layout>
      <Seo title='Logged-in' />
      <ContentWrapper>
        <Authenticated>
          {({ usernames }) => (_.get(usernames, '0.username') ? (
            <div>
              <Heading>Welcome back! you are now logged in.</Heading>
              <DashboardLink><Button>Goto dashboard</Button></DashboardLink>
            </div>
          ) : (
            <div>
              <Heading>Please set your username to finish signing up.</Heading>
              <CompleteSignupForm onComplete={allDone} />
            </div>
          ))}
        </Authenticated>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(LoggedInPage)


