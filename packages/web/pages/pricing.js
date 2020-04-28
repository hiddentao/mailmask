import React, { useMemo, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

import { FAQ } from '../src/frontend/constants'
import { withApollo } from '../src/frontend/hoc'
import { FaqLink } from '../src/frontend/components/Link'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import FaqBlock from '../src/frontend/components/FaqBlock'
import Seo from '../src/frontend/components/Seo'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
`

const H1 = styled.h1`
  text-align: center;
`

const Intro = styled.p`
  text-align: center;
  ${font('body')};
  font-size: 1.2rem;
  margin: 3rem 0;

  strong {
    ${font('body', 'bold')};
  }
`

const ScheduleBar = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'stretch' })};
  margin: 1rem 0 3rem;
  background-color: ${({ theme }) => theme.pricingPageScheduleBgColor};
  border: 1px solid ${({ theme }) => theme.pricingPageScheduleBorderColor};
  border-radius: 5px;
`

const Schedule = styled.div`
  font-size: 1.5rem;
  padding: 0.6em 1em;
  color: ${({ theme, selected }) => (selected ? theme.pricingPageSelectedScheduleTextColor : theme.pricingPageScheduleTextColor)};
  background-color: ${({ theme, selected }) => (selected ? theme.pricingPageSelectedScheduleBgColor : theme.pricingPageScheduleBgColor)};
  text-align: center;
  cursor: pointer;

  small {
    display: inline-block;
    font-size: 70%;
  }
`

const Package = styled.div`
  margin-bottom: 2rem;
`

const PackageDetails = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'stretch' })};
  border: 1px solid ${({ theme }) => theme.pricingPagePackageBorderColor};
  border-radius: 5px;
  margin-bottom: 1rem;
`

const PriceContainer = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  padding: 1rem;
`

const PriceOriginal = styled.span`
  color: ${({ theme }) => theme.pricingPageOriginalPriceTextColor};
  font-size: 80%;
  ${font('body', 'thin')};
  background: linear-gradient(155deg,#ffffff 46%,#f00 47%, #f00 53%, #ffffff 54%);
`

const PriceNumber = styled.div`
  font-size: 5rem;
`

const PriceCurrency = styled.span`
  font-size: 50%;
`

const PriceSchedule = styled.div`
  text-align: center;
  ${font('body', 'regular', 'italic')};
  color: ${({ theme }) => theme.pricingPagePriceScheduleTextColor};
`

const BenefitList = styled.ul`
  display: block;
`
const Benefit = styled.li`
  display: block;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.pricingPageBenefitBorderColor};

  em {
    ${font('body', 'bold')};
  }
`

const SignUpContainer = styled.div`
  p {
    margin-bottom: 2rem;

    strong {
      ${font('body', 'bold')};
    }
  }
`

const StyledGetStartedForm = styled(GetStartedForm)`
  margin: 0 auto;
  width: 100%;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    width: 80%;
  }
`

const FaqContainer = styled.div`
  margin-top: 5rem;

  h2 {
    text-align: center;
    margin: 1rem;
  }

  & > p {
    margin: 1rem 0;
    text-align: center;
  }
`

const FaqBlocks = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'stretch' })};
  margin-top: 4rem;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'row', justify: 'space-around', align: 'flex-start' })};
  }
`

const StyledFaqBlock = styled(FaqBlock)`
  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    width: 40%;
  }
`

const BASE_PRICE = 5

const PricingPage = () => {
  const [ selectedSchedule, setSelectedSchedule ] = useState('yearly')

  const originalPrice = useMemo(() => {
    if ('yearly' === selectedSchedule) {
      return BASE_PRICE * 12
    }
  }, [ selectedSchedule ])

  const finalPrice = useMemo(() => {
    if ('yearly' === selectedSchedule) {
      return (BASE_PRICE * 12) * 0.8
    } else {
      return BASE_PRICE
    }
  }, [ selectedSchedule ])

  const setMonthlySchedule = useCallback(() => setSelectedSchedule('monthly'), [])
  const setYearlySchedule = useCallback(() => setSelectedSchedule('yearly'), [])

  return (
    <Layout>
      <Seo title='Pricing' />
      <ContentWrapper>
        <Container>
          <H1>Pricing</H1>
          <Intro>All our pricing plans start with a <strong>30-day FREE trial</strong>.</Intro>
          <ScheduleBar>
            <Schedule
              selected={selectedSchedule === 'monthly'}
              onClick={setMonthlySchedule}
            >
              Monthly
            </Schedule>
            <Schedule
              selected={selectedSchedule === 'yearly'}
              onClick={setYearlySchedule}
            >
              Yearly <small>(20% off)</small>
            </Schedule>
          </ScheduleBar>
          <Package>
            <PackageDetails>
              <PriceContainer>
                <PriceNumber>
                  {originalPrice ? (
                    <PriceOriginal><PriceCurrency>$</PriceCurrency>{originalPrice}</PriceOriginal>
                  ) : null}
                  <PriceCurrency>$</PriceCurrency>
                  {finalPrice}
                </PriceNumber>
                <PriceSchedule>per {selectedSchedule === 'monthly' ? 'month' : 'year'}</PriceSchedule>
              </PriceContainer>
              <BenefitList>
                <Benefit><em>Unlimited</em> email masks</Benefit>
                <Benefit>Mobile-friendly dashboard</Benefit>
                <Benefit>Total email privacy</Benefit>
              </BenefitList>
            </PackageDetails>
          </Package>
          <SignUpContainer>
            <p>Sign up for your 30-day FREE trial now. <strong>No credit card needed:</strong></p>
            <StyledGetStartedForm />
          </SignUpContainer>
        </Container>
        <FaqContainer>
          <h2>Frequently asked questions</h2>
          <FaqBlocks>
            <StyledFaqBlock data={FAQ.TRIAL_COLUMN_1} initiallyExpanded={true} />
            <StyledFaqBlock data={FAQ.TRIAL_COLUMN_2} initiallyExpanded={true} />
          </FaqBlocks>
          <p>For more answers, please visit our <FaqLink>FAQ page</FaqLink>.</p>
        </FaqContainer>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(PricingPage)

