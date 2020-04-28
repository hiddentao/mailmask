import React from 'react'
import styled from '@emotion/styled'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import AlertBox from '../src/frontend/components/AlertBox'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import SupportEmail from '../src/frontend/components/SupportEmail'
import { FaqLink } from '../src/frontend/components/Link'

const Container = styled.div`
  h1 {
    margin-bottom: 3rem;
  }

  & > p {
    display: block;
    margin: 2rem 0;
  }
`

const HelpPage = () => {
  return (
    <Layout>
      <Seo title='Help & Support' />
      <ContentWrapper>
        <Container>
          <h1>Help & Support</h1>
          <div>
            <AlertBox>If you have a question for us please first check the <FaqLink>FAQ page</FaqLink> to see if your question has already been answered.</AlertBox>
          </div>
          <p>You can talk to us directly via the instant chat (see bottom-right of this page), or you can email us at <SupportEmail />.</p>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(HelpPage)

