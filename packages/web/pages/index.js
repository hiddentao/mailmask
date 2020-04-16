import React from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

import { withApollo } from '../src/frontend/hoc'
import { headerHeight } from '../src/frontend/components/Header'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import Typing from '../src/frontend/components/Typing'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import MaxContentWidth from '../src/frontend/components/MaxContentWidth'
import HowItWorks from '../src/frontend/components/page/home/HowItWorks'

const TopBlock = styled.div`
  height: calc(100vh - ${headerHeight});
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  padding: 1rem;
`

const TagLine = styled.p`
  font-size: 3.5rem;
  text-align: center;
  line-height: 1.2em;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    font-size: 4rem;
  }
`


const TypingExample = styled(Typing)`
  ${font('body')};
  font-size: 1.8rem;
  margin-top: 4rem;
  text-align: center;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    font-size: 4rem;
  }
`

const FirstGetStartedForm = styled(GetStartedForm)`
  width: 80%;
  margin-top: 3rem;
`

const ContentBlock = styled(ContentWrapper)`
  min-height: 100vh;

  h2 {
    text-align: center;
    margin: 1rem 0 2rem;
    font-size: 3rem;
  }
`

const ItemList = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
`

const StyledHowItWorks = styled(HowItWorks)`
  margin: 2rem 0;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin: 3rem;
  }
`

const InterimBlock = styled(MaxContentWidth)``
const InterimBlockInner = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0;

  h2 {
    margin-top: 0;
  }
`

const Benefit = styled.div`
  width: 60%;
  border: 1px solid ${({ theme }) => theme.homePageBenefitBorderColor};
  border-radius: 5px;
  padding: 2rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.3em;
  margin-bottom: 2rem;

  strong {
    ${font('body', 'bold')};
    display: block;
    font-size: 1.3em;
    line-height: 1.1em;
    margin-bottom: 0.5rem;
  }
`


const HomePage = () => {
  return (
    <Layout>
      <Seo title='Home' />
      <TopBlock>
        <TagLine>
          Beat Spam. Protect Your Privacy.
        </TagLine>
        <TypingExample username='you' />
        <FirstGetStartedForm />
      </TopBlock>
      <ContentBlock>
        <h2>How it works</h2>
        <ItemList>
          <StyledHowItWorks
            number={1}
            details='Provide us your real email address and choose an easy-to-remember username.'
            example={(
              <span>If your real email address is jim@gmail.com then you might choose jim as your username.</span>
            )}
          />
          <StyledHowItWorks
            number={2}
            details='Next time you need to give someone your email address just make one up (a "mask") on-the-fly (a "mask").'
            example={(
              <span>If your username is jim then you could sign up for acme.com
              using acme@jim.msk.sh. We will forward
              all email received here to your real email address.</span>
            )}
          />
          <StyledHowItWorks
            number={3}
            details='Whenever you want to stop receiving email through an address
          you can turn it off through the dashboard without having to inform the sender.'
            example={(
              <span>If you turn off acme@jim.msk.sh you will no longer receive emails
          sent to it. Goodbye spam, hello privacy!</span>
            )}
          />
        </ItemList>
      </ContentBlock>
      <InterimBlock>
        <InterimBlockInner>
          <h2>Get started</h2>
          <GetStartedForm />
        </InterimBlockInner>
      </InterimBlock>
      <ContentBlock>
        <h2>Benefits</h2>
        <ItemList>
          <Benefit>
            <strong>Never give out your real email address.</strong>
            Create as many or as few masks for your real email address as you like - no limits!
          </Benefit>
          <Benefit>
            <strong>Block unwanted emails permanently.</strong>
            Unable to unsubscribe from an annoying newsletter? Just block the mask you
            gave them.
          </Benefit>
          <Benefit>
            <strong>Find out who is sharing your address.</strong>
            When one of your mask addresses gets shared without your consent you
            will know who did it!
          </Benefit>
        </ItemList>
      </ContentBlock>
      <InterimBlockInner>
        <h2>Get started</h2>
        <GetStartedForm />
      </InterimBlockInner>
    </Layout>
  )
}

export default withApollo(HomePage)


