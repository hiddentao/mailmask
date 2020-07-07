import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { FAQ } from '../src/frontend/constants'
import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import AverageEmailSizeFootnote from '../src/frontend/components/AverageEmailSizeFootnote'
import FaqBlock from '../src/frontend/components/FaqBlock'
import Seo from '../src/frontend/components/Seo'

const Container = styled.div`
  h1 {
    margin-bottom: 3rem;
  }
`

const FaqColumns = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'stretch' })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'row', justify: 'space-between', align: 'flex-start' })};
  }
`

const FaqColumn = styled.div`
  width: 100%;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    width: 40%;
  }
`

const StyledFaqBlock = styled(FaqBlock)`
  margin-bottom: 4rem;
`

const FaqPage = () => {
  return (
    <Layout>
      <Seo title='FAQ' description='All your Mailmask questions answered.' />
      <ContentWrapper>
        <Container>
          <h1>FAQ</h1>
          <FaqColumns>
            <FaqColumn>
              <StyledFaqBlock heading='Introduction' data={FAQ.BASIC} />
              <StyledFaqBlock heading='Aliases' data={FAQ.ALIASES} />
              <StyledFaqBlock heading='Privacy' data={FAQ.PRIVACY} />
              <StyledFaqBlock heading='Limits' data={FAQ.LIMITS} />
              <StyledFaqBlock heading='Monthly bandwidth' data={FAQ.BANDWIDTH} />
            </FaqColumn>
            <FaqColumn>
              <StyledFaqBlock heading='Free and Premium plans' data={FAQ.PLANS} />
              <StyledFaqBlock heading='Payments and subscriptions' data={FAQ.SUBSCRIPTIONS} />
              <StyledFaqBlock heading='Account management' data={FAQ.ACCOUNT} />
              <StyledFaqBlock heading='Troubleshooting' data={FAQ.TROUBLESHOOTING} />
            </FaqColumn>
          </FaqColumns>
          <AverageEmailSizeFootnote />
          </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(FaqPage)

