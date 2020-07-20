import React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { _, buildMaskAddress } from '@mailmask/utils'

import { withApollo } from '../src/frontend/hoc'
import { getAppConfig } from '../src/frontend/appConfig'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import { DashboardLink } from '../src/frontend/components/Link'
import Authenticated from '../src/frontend/components/Authenticated'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Button from '../src/frontend/components/Button'

const { DOMAIN } = getAppConfig()

const Heading = styled.h1`
  line-height: 1.3em;
  margin-bottom: 2rem;
`

const Suggestion = styled.div`
  font-size: 120%;
  line-height: 1.4em;
  margin-bottom: 2rem;

  p {
    margin: 1rem 0;
  }

  strong {
    font-style: monospace;
    font-weight: bolder;
    margin: 0 0.2em;
  }

  em {
    font-style: italic;
  }
`

const ALIAS = 'funkymonkey'

const PostSignupPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <Seo title='Sign up complete!' />
      <ContentWrapper>
        <Authenticated fetchPolicy='network-only'>
          {({ usernames }) => {
            const u = _.get(usernames, '0.username')

            if (u) {
              const testMaskAddress = buildMaskAddress(ALIAS, u, DOMAIN)
              return (
                <div>
                  <Heading>Well done, your inbox is now protected!</Heading>
                  <Suggestion>
                    <p>From now on, emails sent to <strong><em>anything</em>@{u}.{DOMAIN}</strong> will be forwarded to your mailbox.</p>
                    <p>Try it out! Send an email to <a href={`mailto:${testMaskAddress}`}>{testMaskAddress}</a> and then goto your dashboard to see the <strong>{ALIAS}</strong> alias show up.</p>
                  </Suggestion>
                  <DashboardLink><Button>Goto dashboard</Button></DashboardLink>
                </div>
              )
            } else {
              router.replace('/logged-in')

              return null
            }
          }}
        </Authenticated>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(PostSignupPage)


