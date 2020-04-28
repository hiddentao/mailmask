import React from 'react'
import styled from '@emotion/styled'

import terms from '../src/legal/terms'
import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import Markdown from '../src/frontend/components/Markdown'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import SupportEmail from '../src/frontend/components/SupportEmail'


const Container = styled.div`
  h1 {
    margin: 3rem 0 2rem;

    &:first-child {
      margin-top: 0;
    }
  }
`

const StyledMarkdown = styled(Markdown)`
  margin: 1rem 0 3rem;
`


const LegalPage = () => {
  return (
    <Layout>
      <Seo title='Terms and conditions' />
      <ContentWrapper>
        <Container>
          <h1>Terms and Conditions</h1>
          <StyledMarkdown>{terms}</StyledMarkdown>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, You can contact us at <SupportEmail /></p>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(LegalPage)

