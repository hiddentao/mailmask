import React from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

import { getAppConfig } from '../src/frontend/appConfig'
import { withApollo } from '../src/frontend/hoc'
import { headerHeight } from '../src/frontend/components/Header'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import Typing from '../src/frontend/components/Typing'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import MaxContentWidth from '../src/frontend/components/MaxContentWidth'
import HowItWorks from '../src/frontend/components/page/home/HowItWorks'

const { DOMAIN } = getAppConfig()

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

const StyledGetStartedForm = styled(GetStartedForm)`
  margin: 0 auto;
`

const FirstGetStartedForm = styled(StyledGetStartedForm)`
  width: 80%;
  margin: 4rem auto 0;
`

const ContentBlock = styled(ContentWrapper)`
  min-height: 100vh;

  h2 {
    text-align: center;
    margin: 1rem 0 2rem;
    font-size: 3rem;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    min-height: auto;
  }
`

const ItemList = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'row', justify: 'space-around', align: 'stretch' })};
  }
`

const StyledHowItWorks = styled(HowItWorks)`
  margin: 2rem 0;
  width: 80%;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    justify-content: flex-start;
    margin: 2rem 1rem;
    max-width: 300px;
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
  width: 80%;
  border: 1px solid ${({ theme }) => theme.homePageBenefitBorderColor};
  border-radius: 5px;
  padding: 2rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.3em;
  margin: 2rem 0;

  strong {
    ${font('body', 'bold')};
    display: block;
    font-size: 1.3em;
    line-height: 1.1em;
    margin-bottom: 0.5rem;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin: 2rem 1rem;
    max-width: 300px;
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
              <span>If your real email address is <strong>jim@gmail.com</strong> then you might choose <strong>jim</strong> as your username.</span>
            )}
          />
          <StyledHowItWorks
            number={2}
            details='Next time you need to give someone your email address just make one up on-the-fly (we cal this an "alias").'
            example={(
              <span>If your username is <strong>jim</strong> then you could sign up for <strong>acme.com</strong> using <strong>acme@jim.{DOMAIN}</strong>. We will forward
              all email received here to your real email address.</span>
            )}
          />
          <StyledHowItWorks
            number={3}
            details='Whenever you want to stop receiving email through an alias
          you can turn it off through the dashboard without having to inform the sender.'
            example={(
              <span>If you turn off <strong>acme@jim.{DOMAIN}</strong> you will no longer receive emails
          sent to it. Goodbye spam, hello privacy!</span>
            )}
          />
        </ItemList>
      </ContentBlock>
      <InterimBlock>
        <InterimBlockInner>
          <h2>Get started</h2>
          <StyledGetStartedForm />
        </InterimBlockInner>
      </InterimBlock>
      <ContentBlock>
        <h2>Benefits</h2>
        <ItemList>
          <Benefit>
            <strong>Keep your email address private forever.</strong>
            Create as many or as few aliases as you like - no limits!
          </Benefit>
          <Benefit>
            <strong>Block unwanted emails with certainty.</strong>
            Unable to unsubscribe from an annoying newsletter? Just block the specific alias address you
            gave them.
          </Benefit>
          <Benefit>
            <strong>No more worrying about misuse</strong>
            When an alias address gets shared with marketers without your consent you
            can just turn it off. Your real address remains private.
          </Benefit>
          <Benefit>
            <strong>No more worrying about hacks</strong>
            If a service gets hacked, only the alias address you gave them is
            compromised, not your real email address.
          </Benefit>
        </ItemList>
      </ContentBlock>
      <InterimBlockInner>
        <h2>Take back control of your inbox now!</h2>
        <StyledGetStartedForm />
      </InterimBlockInner>
    </Layout>
  )
}

export default withApollo(HomePage)


