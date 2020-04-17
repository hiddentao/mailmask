import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { font } from 'emotion-styled-utils'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import { DashboardLink } from '../src/frontend/components/Link'
import Typing from '../src/frontend/components/Typing'
import Button from '../src/frontend/components/Button'
import NoSsr from '../src/frontend/components/NoSsr'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'

const Intro = styled.div`
  ${font('header')};
  font-size: 2rem;

  p {
    display: block;
    margin-bottom: 1rem;
  }
`

const Sub = styled.div`
  ${font('body')};
  margin: 2rem 0;

  p {
    display: block;
    margin: 1rem 0;

    strong {
      ${font('body', 'bold')};
    }
  }
`

const StyledTyping = styled(Typing)`
  margin: 2rem 0;
  font-size: 140%;
`

const SignUpDonePage = () => {
  const router = useRouter()
  const { username } = useMemo(() => router.query, [ router ])

  return (
    <Layout>
      <Seo title='You are set!' />
      <ContentWrapper>
        <Intro>
          <p>
            You are now signed up!
          </p>
        </Intro>
        <Sub>
          <p>
            From now, whenever you need to provide an email address you can just make one up (a "mask") using your username:
          </p>
          <StyledTyping username={username} />
          <p>
            We will forward all email received via these masks onto your real email address - note that all forwarded email will appear to come
            from <NoSsr><strong>no-reply@msk.sh</strong></NoSsr>.
          </p>
          <p>
            You can stop receiving email through a mask at any time by turning it off in your dashboard.
          </p>
        </Sub>
        <DashboardLink><Button>View my dashboard</Button></DashboardLink>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(SignUpDonePage)


