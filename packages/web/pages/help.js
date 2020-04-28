import React from 'react'
import styled from '@emotion/styled'
import { font } from 'emotion-styled-utils'

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

  p {
    display: block;
    margin: 2rem 0;
  }
`

const Email = styled.span`
  ${font('body', 'bold')};
  font-size: 1.2rem;
`


const HelpPage = () => {
  return (
    <Layout>
      <Seo title='Help & Support' />
      <ContentWrapper>
        <Container>
          <h1>Help & Support</h1>
          <p>
            <AlertBox>If you have a question for us please first check the <FaqLink>FAQ page</FaqLink> to see if your question has already been answered.</AlertBox>
          </p>
          <p>You get in touch with us by email at: <Email><SupportEmail /></Email></p>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(HelpPage)

