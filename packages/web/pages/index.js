import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { _, toPrettyNumberString } from '@mailmask/utils'

import { getAppConfig, isSelfHosted } from '../src/frontend/appConfig'
import { TAGLINE } from '../src/frontend/constants'
import { withApollo } from '../src/frontend/hoc'
import { useSafeQuery } from '../src/frontend/hooks'
import { headerHeight } from '../src/frontend/components/Header'
import { GetGlobalStatsQuery } from '../src/graphql/queries'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import SplashImage from '../src/frontend/components/SplashImage'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import Image from '../src/frontend/components/Image'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import { DashboardLink } from '../src/frontend/components/Link'
import HowItWorks from '../src/frontend/components/page/home/HowItWorks'
import Benefits from '../src/frontend/components/page/home/Benefits'
import TestimonialQuote from '../src/frontend/components/page/home/TestimonialQuote'

const { DOMAIN } = getAppConfig()

const SelfHostedBlock = styled(ContentWrapper)`
  min-height: 100vh;
  padding-top: 3rem;

  h1 {
    text-align: center;
    margin: 0 0 3rem;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    min-height: auto;
  }
`

const TopBlock = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  height: calc(100vh - ${headerHeight});
  padding: 1rem;
  text-align: center;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'row', justify: 'center', align: 'center' })};
    text-align: initial;
  }
`

const TopBlockForm = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'flex-start' })};
  margin: 0 auto;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    max-width: 600px;
    margin: 0 2rem 0 0;
  }
`

const TopBlockSplash = styled.div`
  display: none;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: block;
  }
`

const TagLine = styled.p`
  ${({ theme }) => theme.font('body', 'thin')};
  font-size: 3.5rem;
  line-height: 1em;
  margin: 0 auto;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    font-size: 4rem;
  }
`

const SubTagLine = styled.div`
  font-size: 1.3rem;
  line-height: 1.2em;
  margin: 1rem 0 0;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    font-size: 1.5rem;
  }

  strong {
    ${({ theme }) => theme.font('body', 'bold')};
  }
`

const DetailsDiv = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
`

const StyledGetStartedForm = styled(GetStartedForm)`
  margin: 0 auto;
  max-width: 400px;
`

const FirstGetStartedForm = styled(GetStartedForm)`
  margin: 3rem auto 0;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin: 3rem 0 0;
  }
`

const Stats = styled.div`
  ${({ theme }) => theme.font('body', 'regular', 'italic')};
  font-size: 0.9rem;
  margin: 2rem auto 0;
  max-width: 80%;
  position: relative;

  strong {
    ${({ theme }) => theme.font('body', 'bold', 'italic')};
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    max-width: auto;
    margin: 2rem 0 0;
  }
`

const StatsFireImage = styled(Image)`
  width: 1.7em;
  height: auto;
  vertical-align: sub;
`


const ContentBlock = styled(ContentWrapper)`
  min-height: 100vh;
  padding-top: 3rem;

  h2 {
    text-align: center;
    margin: 1rem 0 2rem;
    font-size: 2.6rem;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    min-height: auto;
  }
`

const BenefitsBlock = styled(ContentBlock)`
  h2 {
    margin-bottom: 0;
  }
`


const HowItWorksList = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'stretch' })};
`

const StyledHowItWorks = styled(HowItWorks)`
  margin: 0 0 4rem;
`

const InterimBlock = styled(ContentBlock)`
  min-height: auto;

  h2 {
    font-size: 2rem;
  }
`

const InterimBlockInner = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 0;

  h2 {
    font-size: 1.5rem;
    margin-top: 0;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    max-width: 80%;
  }
`

const StyledTestimonialQuote = styled(TestimonialQuote)``


const HomePage = () => {
  const { data } = useSafeQuery(GetGlobalStatsQuery, {
    fetchPolicy: 'cache-and-network',
  })

  const stats = useMemo(() => {
    return {
      numBlocked: toPrettyNumberString(_.get(data, 'result.numBlocked', 345)),
      numUsers: toPrettyNumberString(_.get(data, 'result.numUsers', 21)),
    }
  }, [ data ])

  return (
    <Layout>
      <Seo />
      {isSelfHosted() ? (
        <SelfHostedBlock>
          <h1>This is a self-hosted version of Mailmask.</h1>
          <StyledGetStartedForm />
        </SelfHostedBlock>
      ) : (
        <React.Fragment>
          <TopBlock>
            <TopBlockForm>
              <TagLine>
                {TAGLINE}.
          </TagLine>
              <SubTagLine>
                Create <strong>unlimited</strong> temporary email addresses which forward to your real mailbox.
          </SubTagLine>
              <FirstGetStartedForm />
              <Stats>
                Over <strong>{stats.numBlocked}</strong> emails already blocked
            for <strong>{stats.numUsers}</strong> users <StatsFireImage src='fire' />
              </Stats>
            </TopBlockForm>
            <TopBlockSplash>
              <SplashImage />
            </TopBlockSplash>
          </TopBlock>
          <ContentBlock type='alt1' prevType='normal'>
            <h2 id="how-it-works">How it works</h2>
            <HowItWorksList>
              <StyledHowItWorks
                number={1}
                details='Register on Mailmask with your real email address and setup a unique username.'
                example={(
                  <span>If your real email address is <strong>bruce@gmail.com</strong> then you might set <strong>batman</strong> as your username.</span>
                )}
              />
              <StyledHowItWorks
                number={2}
                details={
                  <DetailsDiv>
                    Now you can create "alias" addresses based on your username. All mail received will be forwarded to your real email address.
              </DetailsDiv>
                }
                example={(
                  <span>If your username is <strong>batman</strong> then you might sign up for <strong>nytimes.com</strong> using <strong>nytimes@batman.{DOMAIN}</strong>.</span>
                )}
              />
              <StyledHowItWorks
                number={3}
                details={
                  <span>
                    When you wish to stop receiving email through a particular alias
                you can simply turn it off through <DashboardLink>the dashboard</DashboardLink>.
              </span>}
                example={(
                  <span>If you turn off <strong>nytimes@batman.{DOMAIN}</strong> you will no longer receive emails
          sent to it.</span>
                )}
              />
            </HowItWorksList>
          </ContentBlock>
          <InterimBlock prevType='alt1'>
            <InterimBlockInner>
              <StyledTestimonialQuote
                text='Best thing about mailmask is how easy it is to just turn off emails I don’t want. Just one click and I’m done. Too easy'
                pic='farez'
                name='Farez'
                website='https://markfolder.com'
                company='Markfolder'
              />
            </InterimBlockInner>
          </InterimBlock>
          <BenefitsBlock type='alt1' prevType='normal'>
            <h2>Features</h2>
            <Benefits />
          </BenefitsBlock>
          <InterimBlock type='normal' prevType='alt1'>
            <InterimBlockInner>
              <h2>Take back control of your inbox now!</h2>
              <StyledGetStartedForm />
            </InterimBlockInner>
          </InterimBlock>
        </React.Fragment>
      )}
    </Layout>
  )
}

export default withApollo(HomePage)


