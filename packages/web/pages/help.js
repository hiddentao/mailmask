import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import AlertBox from '../src/frontend/components/AlertBox'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import SupportEmail from '../src/frontend/components/SupportEmail'
import Icon from '../src/frontend/components/Icon'
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

const List = styled.ul`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start', wrap: 'wrap' })};
`

const Item = styled.li`
  display: block;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.helpPageContactItemBorderColor};
  margin: 0 2rem 2rem 0;

  a {
    display: block;
    ${flex({ direction: 'column', justify: 'center', align: 'center' })};
    width: 200px;
    height: 200px;
    padding: 1rem;
    font-size: 1.5rem;
    text-align: center;
  }
`

const ItemIcon = styled(Icon)`
  display: block;
  margin: 0 auto 2rem;
  font-size: 5rem;
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
          <p>You can get in touch with us via:</p>
          <List>
            <Item>
              <a href="https://t.me/joinchat/ISCMRVPERWbg1st-Qn7BQw">
                <ItemIcon name='comments' />
                <p>Telegram</p>
              </a>
            </Item>
            <Item>
              <SupportEmail>
                <ItemIcon name='envelope' />
                <p>Email</p>
              </SupportEmail>
            </Item>
          </List>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(HelpPage)

