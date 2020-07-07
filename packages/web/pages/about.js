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
      <Seo title='About' description='About Mailmask' />
      <ContentWrapper>
        <Container>
          <h1>About</h1>
          <p>
            Hi, I'm <a href="https://hiddentao.com">Ram</a>, the creator of Mailmask.
          </p>
          <p>
            I built Mailmask in response to the frustrations of having to deal with spam, email addresses
            being sold to advertisers, and being unable to unsubscribe from or block certain senders.
          </p>
          <p>
            Though there are solutions out there which claim to solve all of these problems, they just weren't
            flexible enough for my needs. Mailmask overcomes many of the limitations I found in other services.
          </p>
          <p>
            The Mailmask mission is to help as many people as possible get on top of
            their email spam and protect their privacy. There are no ads, and your data does not get
            sold to any third parties.
          </p>
          <p>
            I hope you enjoy using it as much as I do!
          </p>
          <p>
            - Ram
          </p>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(AboutPage)

