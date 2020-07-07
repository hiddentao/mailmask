import React from 'react'
import styled from '@emotion/styled'

import { getAppConfig } from '../src/frontend/appConfig'
import Layout from '../src/frontend/components/Layout'
import AlertBox from '../src/frontend/components/AlertBox'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import SupportEmail from '../src/frontend/components/SupportEmail'
import { FaqLink } from '../src/frontend/components/Link'

const { SUPPORT_EMAIL } = getAppConfig()

const Container = styled.div`
  h1 {
    margin-bottom: 3rem;
  }

  & > p {
    display: block;
    margin: 2rem 0;
  }
`

const List = styled.ul`
  list-style: disc;
  margin-left: 2rem;
`

const Item = styled.li`
  margin-bottom: 0.5rem;

  em {
    font-style: italic;
  }
`


const HelpPage = () => {
  return (
    <Layout>
      <Seo title='Help & Support' description='Get help with using Mailmask.' />
      <ContentWrapper>
        <Container>
          <h1>Help & Support</h1>
          <div>
            <AlertBox>If you have a question for us please first check the <FaqLink>FAQ page</FaqLink> to see if your question has already been answered.</AlertBox>
          </div>
          <p>You can get in touch with us via:</p>
          <List>
            <Item>
              Webchat: <em>click the chat icon on the bottom-right of the window</em>
            </Item>
            <Item>
              Email: <SupportEmail>{SUPPORT_EMAIL}</SupportEmail>
            </Item>
            <Item>
              Twitter: <a href="https://twitter.com/mskhq">@mskhq</a>
            </Item>
          </List>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default HelpPage

