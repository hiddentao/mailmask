import React, { useMemo, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { flex, boxShadow } from 'emotion-styled-utils'
import { _, SUB, calculateEmailsForBandwidthMb, toPrettyNumberString } from '@mailmask/utils'

import { getAppConfig } from '../appConfig'
import Icon from './Icon'
import IconButton from './IconButton'
import HintButton from './HintButton'
import AverageEmailSizeFootnote from './AverageEmailSizeFootnote'

const { DOMAIN } = getAppConfig()

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
`

const ScheduleBar = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'stretch' })};
  ${({ theme }) => boxShadow({ color: theme.pricing.schedule.shadowColor })};
  background-color: ${({ theme }) => theme.pricing.schedule.bgColor};
  border-radius: 5px;
`

const Schedule = styled.div`
  font-size: 1.5em;
  padding: 0.6em 1em;
  color: ${({ theme, selected }) => (selected ? theme.pricing.selectedSchedule.textColor : theme.pricing.schedule.textColor)};
  background-color: ${({ theme, selected }) => (selected ? theme.pricing.selectedSchedule.bgColor : theme.pricing.schedule.bgColor)};
  text-align: center;
  cursor: pointer;

  small {
    display: inline-block;
    font-size: 60%;
    color: ${({ theme }) => theme.pricing.moneyOff.textColor};
  }
`

const PlanList = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'center', wrap: 'wrap' })};
  margin-top: 4em;
`

const Plan = styled.div`
  margin: 0 1em 4em 1em;
  min-width: 250px;
  font-size: ${({ largerLook }) => (largerLook ? '110%' : '100%')};

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin: 0 2em 0 0;
  }
`

const PlanDetails = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'stretch' })};
  ${({ theme }) => boxShadow({ color: theme.pricing.plan.details.shadowColor })};
  background-color: ${({ theme }) => theme.pricing.plan.details.bgColor};
  color: ${({ theme }) => theme.pricing.plan.details.textColor};
  border-radius: 5px;
  margin-bottom: 2em;
  position: relative;
`

const PlanName = styled.div`
  ${({ theme }) => theme.font('body', 'thin', 'italic')};
  font-size: 2em;
  text-align: center;
  padding: 0.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.pricing.plan.borderColor};
`

const PriceContainer = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  align-self: center;
  padding: 1em;
  width: 15.7em;
  height: 9.3em;
`

const PriceOriginal = styled.span`
  color: ${({ theme }) => theme.pricing.moneyOff.textColor};
  font-size: 80%;
  ${({ theme }) => theme.font('body', 'thin')};
  background: linear-gradient(155deg,#ffffff 46%,#f00 47%, #f00 53%, #ffffff 54%);
`

const PriceNumber = styled.div`
  font-size: 5em;
`

const PriceCurrency = styled.span`
  font-size: 50%;
`

const PriceSchedule = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};
  ${({ theme }) => theme.font('body', 'regular', 'italic')};
  color: ${({ theme }) => theme.pricing.priceSchedule.textColor};
`

const BenefitList = styled.ul`
  display: block;
`
const Benefit = styled.li`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};
  text-align: center;
  padding: 1em;
  border-top: 1px solid ${({ theme }) => theme.pricing.benefit.borderColor};

  em {
    ${({ theme }) => theme.font('body', 'bold')};
  }

  i {
    ${({ theme }) => theme.font('body', 'regular', 'italic')};
  }
`

const ToggleScheduleButton = styled(IconButton)`
  margin-left: 0.2em;
  font-size: 80%;
  padding: 0.1em 0.3em;
`

const BenefitHintButton = styled(HintButton)`
  margin-left: 0.3em;
`

const BenefitHintBody = styled.div`
  p {
    margin-bottom: 1em;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledAverageEmailSizeFootnote = styled(AverageEmailSizeFootnote)`
  margin-top: 2rem;
`

const PreferredIcon = styled(Icon)`
  font-size: 40px;
  position: absolute;
  top: -20px;
  right: -20px;
  transform: rotate(45deg);
  color: ${({ theme }) => theme.pricing.preferredIcon.textColor};
`


const BenefitHint = ({ children }) => (
  <BenefitHintButton
    tooltip={<BenefitHintBody>{children}</BenefitHintBody>}
  />
)

const LargeEmailsBenefit = () => (
  <Benefit>
    <span>Large attachments</span>
    <BenefitHint>
      Long emails with multiple large attachments are fully supported.
    </BenefitHint>
  </Benefit>
)

const NoAdsBenefit = () => (
  <Benefit>
    <span>No adverts</span>
    <BenefitHint>
      We don't serve you ads or modify your email content except to tell you that it was handled by Mailmask.
    </BenefitHint>
  </Benefit>
)

const UnlimitedAliasesBenefit = () => (
  <Benefit>
    <span>Unlimited email aliases</span>
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

const BandwidthBenefit = ({ val, emphasize }) => {
  // eslint-disable-next-line no-bitwise
  const numMsgs = useMemo(() => {
    return toPrettyNumberString(calculateEmailsForBandwidthMb(val), { maximumSignificantDigits: 2 })
  }, [ val ])

  return (
    <Benefit>
      <span>Bandwidth: {emphasize ? <em>{val} MB</em> : <span>{val} MB</span>}</span>
      <BenefitHint>
        Receive upto {val} MB of email (~{numMsgs} <em>average-sized*</em> messages) per calendar month.
      </BenefitHint>
    </Benefit>
  )
}

const AllInPlan = ({ plan }) => (
  <Benefit>
    <span><em>Everything in {plan} and...</em></span>
  </Benefit>
)

const StatsBenefit = () => (
  <Benefit>
    <span><em>Per-alias</em> analytics</span>
    <BenefitHint>
      See per-alias bandwidth usage and other statistics to know exactly where most of your email traffic is coming from.
    </BenefitHint>
  </Benefit>
)

const PriorityDeliveryBenefit = () => (
  <Benefit>
    <span><em>Priority</em> delivery</span>
    <BenefitHint>
      In busy times your emails will get delivered sooner than those of Basic plan users.
    </BenefitHint>
  </Benefit>
)

const PrivateRepliesBenefit = () => (
  <Benefit>
    <span>Private replies</span>
    <BenefitHint>
      When you reply to emails via Mailmask your real email address remains private.
    </BenefitHint>
  </Benefit>
)

const CustomDomainsBenefit = () => (
  <Benefit>
    <span><i>Custom domains (coming soon)</i></span>
    <BenefitHint>
      Use your own domain name instead of <em>{DOMAIN}</em> so that people won't know
      that you're using Mailmask!
    </BenefitHint>
  </Benefit>
)

const AdditionalInboxesBenefit = () => (
  <Benefit>
    <span><i>Additional inboxes (coming soon)</i></span>
    <BenefitHint>
      Register upto 5 more real email addresses and unique usernames which map to them, and manage it
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
          Yearly <small>(~17% off)</small>
        </Schedule>
      </ScheduleBar>
      <PlanList>
        {Object.keys(SUB.PLAN).map(plan => (
          <Plan key={plan} largerLook={plan === SUB.PLAN.PREMIUM}>
            <PlanDetails>
              <PlanName>
                {_.capitalize(plan.toLowerCase())}
              </PlanName>
              <PriceContainer>
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
                      tooltip='Change how often you pay'
                    />
                  </PriceSchedule>
                </div>
              </PriceContainer>
              <BenefitList>
                {plan === SUB.PLAN.BASIC ? (
                  <React.Fragment>
                    <UnlimitedAliasesBenefit />
                    <NoAdsBenefit />
                    <LargeEmailsBenefit />
                    <PrivateRepliesBenefit />
                    <MobileFriendlyDashboardBenefit />
                    <BandwidthBenefit val={SUB.BANDWIDTH.BASIC} />
                  </React.Fragment>
                ) : null}

                {plan === SUB.PLAN.PREMIUM ? (
                  <React.Fragment>
                    <AllInPlan plan='Basic' />
                    <PriorityDeliveryBenefit />
                    <StatsBenefit />
                    <AdditionalInboxesBenefit />
                    <CustomDomainsBenefit />
                    <BandwidthBenefit val={SUB.BANDWIDTH.PREMIUM} emphasize={true} />
                  </React.Fragment>
                ) : null}
              </BenefitList>
              {plan === SUB.PLAN.PREMIUM ? <PreferredIcon name='star' /> : null}
            </PlanDetails>
            {renderPlanFooter ? renderPlanFooter(plan, selectedSchedule) : null}
          </Plan>
        ))}
      </PlanList>
      <StyledAverageEmailSizeFootnote />
    </Container>
  )
}


export default PricingSelection


