import React from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

import { withApollo } from '../src/frontend/hoc'
import { headerHeight } from '../src/frontend/components/Header'
import Layout from '../src/frontend/components/Layout'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import ContentWrapper from '../src/frontend/components/ContentWrapper'

const TopBlock = styled.div`
  height: calc(100vh - ${headerHeight});
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
`

const Title = styled.h1`
  ${font('header')};
  font-size: 4rem;
  margin: 0;
`

const Prefix = styled.span``
const User = styled.span``

const TagLine = styled.p`
  font-size: 2rem;
  margin-top: 2rem;
`

const StartBlock = styled(ContentWrapper)``

const HomePage = () => {
  return (
    <Layout>
      <TopBlock>
        <Title>
          <Prefix>no-more-spam</Prefix>@<User>YOU</User>.msk.sh
        </Title>
        <TagLine>
          Beat Spam. Protect Your Privacy.
        </TagLine>
      </TopBlock>
      <StartBlock>
        <GetStartedForm />
      </StartBlock>
    </Layout>
  )
}

export default withApollo(HomePage)


