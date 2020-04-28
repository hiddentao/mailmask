import React from 'react'
import styled from '@emotion/styled'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'

const Container = styled.div`
  h1 {
    margin-bottom: 2rem;
  }

  p {
    margin: 1rem 0;
    line-height: 1.3em;
  }
`

const AboutPage = () => {
  return (
    <Layout>
      <Seo title='About' />
      <ContentWrapper>
        <Container>
          <h1>About</h1>
          <p>
            Mailmask is a product by <a href="https://hiddentao.com">HiddenTao Labs</a>.
          </p>
          <p>
            It was developed in response to the frustrations of having to deal with spam, email addresses
            being sold to advertisers, and being unable to unsubscribe from or block certain senders.
          </p>
          <p>
            Mailmask aims to help as many people as possible get on top of
            their email spam and protect their privacy.
          </p>
          <p>
            Any and all feedback is welcome!
          </p>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(AboutPage)

