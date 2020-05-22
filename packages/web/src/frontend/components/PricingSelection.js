import React, { useMemo, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'
import { _, SUB, calculateEmailsForBandwidthMb, toPrettyNumberString } from '@mailmask/utils'

import IconButton from './IconButton'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
`

const ScheduleBar = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'stretch' })};
  background-color: ${({ theme }) => theme.pricingPage.schedule.bgColor};
  border: 1px solid ${({ theme }) => theme.pricingPage.schedule.borderColor};
  border-radius: 5px;
`

const Schedule = styled.div`
  font-size: 1.5em;
  padding: 0.6em 1em;
  color: ${({ theme, selected }) => (selected ? theme.pricingPage.selectedSchedule.textColor : theme.pricingPage.schedule.textColor)};
  background-color: ${({ theme, selected }) => (selected ? theme.pricingPage.selectedSchedule.bgColor : theme.pricingPage.schedule.bgColor)};
  text-align: center;
  cursor: pointer;

  small {
    display: inline-block;
    font-size: 70%;
  }
`

const PlanList = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'flex-start', wrap: 'wrap' })};
  margin-top: 4em;
`

const Plan = styled.div`
  margin: 0 2em 4em 0;
  background-color: ${({ theme }) => theme.pricingPage.plan.bgColor};

  &:last-child {
    margin-bottom: 0;
  }
`

const PlanDetails = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'stretch' })};
  border: 1px solid ${({ theme }) => theme.pricingPage.plan.borderColor};
  border-radius: 5px;
  margin-bottom: 1em;
`

const PlanName = styled.div`
  ${font('header')};
  font-size: 2em;
  text-align: center;
  padding: 0.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.pricingPage.plan.borderColor};
`

const PriceContainer = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  padding: 1em;
  width: 15.7em;
  height: 9.3em;
`

const PriceOriginal = styled.span`
  color: ${({ theme }) => theme.pricingPage.originalPrice.textColor};
  font-size: 80%;
  ${font('body', 'thin')};
  background: linear-gradient(155deg,#ffffff 46%,#f00 47%, #f00 53%, #ffffff 54%);
`

const PriceNumber = styled.div`
  font-size: 5em;
`

const PriceFree = styled.div`
  font-size: 3em;
`

const PriceCurrency = styled.span`
  font-size: 50%;
`

const PriceSchedule = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};
  ${font('body', 'regular', 'italic')};
  color: ${({ theme }) => theme.pricingPage.priceSchedule.textColor};
`

const BenefitList = styled.ul`
  display: block;
`
const Benefit = styled.li`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};
  text-align: center;
  padding: 1em;
  border-top: 1px solid ${({ theme }) => theme.pricingPage.benefit.borderColor};

  em {
    ${font('body', 'bold')};
  }
`

const ToggleScheduleButton = styled(IconButton)`
  margin-left: 0.2em;
  font-size: 80%;
  padding: 0.1em 0.3em;
`

const BenefitHintButton = styled(IconButton)`
  margin-left: 0.3em;
  font-size: 60%;
  padding: 0.1em 0.3em;
`

const BenefitHintBody = styled.div`
  p {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const BenefitHint = ({ children }) => (
  <BenefitHintButton
    icon={{ name: 'question' }}
    tooltip={<BenefitHintBody>{children}</BenefitHintBody>}
  />
)

const UnlimitedAliasesBenefit = () => (
  <Benefit>
    <span><em>Unlimited</em> email aliases</span>
    <BenefitHint>
      Create as many email aliases as you want. No limits!
    </BenefitHint>
  </Benefit>
)

const MobileFriendlyDashboardBenefit = () => (
  <Benefit>
    <span>Mobile-friendly dashboard</span>
    <BenefitHint>
      Manage your aliases and account through the mobile-friendly, online dashboard.
    </BenefitHint>
  </Benefit>
)

const BandwidthBenefit = ({ val }) => {
  // eslint-disable-next-line no-bitwise
  const numMsgs = useMemo(() => {
    return toPrettyNumberString(calculateEmailsForBandwidthMb(val), { maximumSignificantDigits: 2 })
  }, [ val ])

  return (
    <Benefit>
      <span>Bandwidth: {val} MB</span>
      <BenefitHint>
        <p>This is the maximum amount of email data you can receive through Mailmask <strong>per calendar month</strong>.</p>
        <p>{val} MB is equivalent to ~{numMsgs} <em>average-sized</em> emails.</p>
      </BenefitHint>
    </Benefit>
  )
}

const StatsBenefit = () => (
  <Benefit>
    <span>Advanced statistics</span>
    <BenefitHint>
      For each alias see bandwidth used, no. of emails received and other statistics.
    </BenefitHint>
  </Benefit>
)

const PrivateRepliesBenefit = () => (
  <Benefit>
    <span>Private replies</span>
    <BenefitHint>
      Hide your real email address even when replying to an email received through Mailmask.
    </BenefitHint>
  </Benefit>
)

const AdditionalInboxesBenefit = () => (
  <Benefit>
    <span>Additional inboxes</span>
    <BenefitHint>
      Register upto 2 more real email addresses and unique usernames which map to them, and manage it
      all in the same Mailmask account.
    </BenefitHint>
  </Benefit>
)


const PricingSelection = ({
  className,
  initialSchedule = SUB.SCHEDULE.MONTHLY,
  renderPlanFooter,
}) => {
  const [ selectedSchedule, setSelectedSchedule ] = useState(initialSchedule)

  const originalPrice = useMemo(() => {
    return Object.keys(SUB.PLAN).reduce((m, p) => {
      if (SUB.SCHEDULE.YEARLY === selectedSchedule) {
        m[p] = SUB.PRICE[p] * 12
      }
      return m
    }, {})
  }, [ selectedSchedule ])

  const finalPrice = useMemo(() => {
    return Object.keys(SUB.PLAN).reduce((m, p) => {
      m[p] = (SUB.SCHEDULE.YEARLY === selectedSchedule ? SUB.PRICE[p] * 10 : SUB.PRICE[p])
      return m
    }, {})
  }, [ selectedSchedule ])

  const setMonthlySchedule = useCallback(() => setSelectedSchedule(SUB.SCHEDULE.MONTHLY), [])
  const setYearlySchedule = useCallback(() => setSelectedSchedule(SUB.SCHEDULE.YEARLY), [])
  const toggleSchedule = useCallback(() => {
    setSelectedSchedule(SUB.SCHEDULE.MONTHLY === selectedSchedule ? SUB.SCHEDULE.YEARLY : SUB.SCHEDULE.MONTHLY)
  }, [ selectedSchedule ])

  return (
    <Container className={className}>
      <ScheduleBar>
        <Schedule
          selected={selectedSchedule === SUB.SCHEDULE.MONTHLY}
          onClick={setMonthlySchedule}
        >
          Monthly
            </Schedule>
        <Schedule
          selected={selectedSchedule === SUB.SCHEDULE.YEARLY}
          onClick={setYearlySchedule}
        >
          Yearly <small>(2 months FREE)</small>
        </Schedule>
      </ScheduleBar>
      <PlanList>
        {Object.keys(SUB.PLAN).map(plan => (
          <Plan key={plan}>
            <PlanDetails>
              <PlanName>{_.capitalize(plan.toLowerCase())}</PlanName>
              <PriceContainer>
                {plan === SUB.PLAN.BASIC ? (
                  <PriceFree>FREE</PriceFree>
                ) : (
                  <div>
                    <PriceNumber>
                      {originalPrice[plan] ? (
                        <PriceOriginal><PriceCurrency>$</PriceCurrency>{originalPrice[plan]}</PriceOriginal>
                      ) : null}
                      <PriceCurrency>$</PriceCurrency>
                      {finalPrice[plan]}
                    </PriceNumber>
                    <PriceSchedule>
                      <span>per {selectedSchedule === SUB.SCHEDULE.MONTHLY ? 'month' : 'year'}</span>
                      <ToggleScheduleButton
                        icon={{ name: 'exchange-alt' }}
                        onClick={toggleSchedule}
                        tooltip='Change payment frequency'
                      />
                    </PriceSchedule>
                  </div>
                )}
              </PriceContainer>
              <BenefitList>
                <UnlimitedAliasesBenefit />
                <MobileFriendlyDashboardBenefit />
                {/* bandwidth */}
                {(plan === SUB.PLAN.BASIC) ? <BandwidthBenefit val={SUB.BANDWIDTH.BASIC} /> : null}
                {(plan === SUB.PLAN.PREMIUM) ? <BandwidthBenefit val={SUB.BANDWIDTH.PREMIUM} /> : null}
                {(plan === SUB.PLAN.PRO) ? <BandwidthBenefit val={SUB.BANDWIDTH.PRO} /> : null}
                {/* alias stats */}
                {(plan === SUB.PLAN.BASIC) ? <Benefit>-</Benefit> : null}
                {(plan === SUB.PLAN.PREMIUM) ? <StatsBenefit /> : null}
                {(plan === SUB.PLAN.PRO) ? <StatsBenefit /> : null}
                {/* replies */}
                {(plan === SUB.PLAN.BASIC) ? <Benefit>-</Benefit> : null}
                {(plan === SUB.PLAN.PREMIUM) ? <Benefit>-</Benefit> : null}
                {(plan === SUB.PLAN.PRO) ? <PrivateRepliesBenefit /> : null}
                {/* multiple inboxes */}
                {(plan === SUB.PLAN.BASIC) ? <Benefit>-</Benefit> : null}
                {(plan === SUB.PLAN.PREMIUM) ? <Benefit>-</Benefit> : null}
                {(plan === SUB.PLAN.PRO) ? <AdditionalInboxesBenefit /> : null}
              </BenefitList>
            </PlanDetails>
            {renderPlanFooter ? renderPlanFooter(plan, selectedSchedule) : null}
          </Plan>
        ))}
      </PlanList>
    </Container>
  )
}


export default PricingSelection


