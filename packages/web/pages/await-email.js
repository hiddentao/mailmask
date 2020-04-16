import React from 'react'
import styled from '@emotion/styled'
import { font } from 'emotion-styled-utils'

import { getAppConfig } from '../src/frontend/appConfig'
import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import NoSsr from '../src/frontend/components/NoSsr'

const { SUPPORT_EMAIL } = getAppConfig()

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
  margin-top: 2rem;

  strong {
    ${font('body', 'bold')};
  }
`

const AwaitEmailPage = () => {
  return (
    <Layout>
      <Seo title='Await email' />
      <ContentWrapper>
        <Intro>
          <p>
            We have sent a link to the email address you provided.
          </p>
          <p>
            Please follow this link to continue.
          </p>
        </Intro>
        <Sub>
          Please check your inbox and/or spam folder for an
          email from <NoSsr><strong>{SUPPORT_EMAIL}</strong></NoSsr>.
        </Sub>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(AwaitEmailPage)

