import React from 'react'
import styled from '@emotion/styled'

import privacy from '../src/legal/privacy'
import cookies from '../src/legal/cookies'
import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import Markdown from '../src/frontend/components/Markdown'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'

const Container = styled.div`
  h1 {
    margin-bottom: 3rem;
  }
`

const StyledMarkdown = styled(Markdown)`
  margin: 1rem 0 3rem;
`


const LegalPage = () => {
  return (
    <Layout>
      <Seo title='Privacy policy' />
      <ContentWrapper>
        <Container>
          <h1>Privacy policy</h1>
          <StyledMarkdown>{privacy}</StyledMarkdown>
          <StyledMarkdown>{cookies}</StyledMarkdown>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(LegalPage)

