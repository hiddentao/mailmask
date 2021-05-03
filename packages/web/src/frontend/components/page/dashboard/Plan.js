import React, { useMemo, useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { SUB } from '@mailmask/utils'

import { preparePlanAndTakePayment } from '../../../utils/payment'
import { PreparePlanMutation } from '../../../../graphql/mutations'
import { useSafeMutation } from '../../../hooks/apollo'
import { getAppConfig, isSelfHosted } from '../../../appConfig'
import Button from '../../Button'
import PaymentDate from '../../PaymentDate'
import QueryResult from '../../QueryResult'
import BandwidthStatsThisMonth from '../../BandwidthStatsThisMonth'
import PricingSelection from '../../PricingSelection'
import WarnBox from '../../WarnBox'
import PaymentProcessorInfo from '../../PaymentProcessorInfo'
import ProcessingPaymentAlert from '../../ProcessingPaymentAlert'
import { Modal } from '../../Modal'

const { SHUTTING_DOWN } = getAppConfig()

const Container = styled.div`
  p {
    margin: 1rem 0;
  }
`

const ChangePlanContainer = styled.div`
  margin-top: 3rem;
`

const StyledPricingSelection = styled(PricingSelection)`
  font-size: 80%;
`

const PricingButtonContainer = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
`

const CurrentPlan = styled.div`
  ${({ theme }) => theme.font('body', 'bold')};
  font-size: 1rem;
  padding: 1em 2em;
`

const SwitchModalContainer = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
  width: 100%;
  height: 100%;
  padding: 2rem;

  p {
    margin: 1rem 0 2rem;
    text-align: center;
  }
`


const ModalSelectedPlan = styled.div`
  ${({ theme }) => theme.font('body', 'bold')};
  font-size: 140%;
  margin-bottom: 1rem;
`

const SwitchButton = styled(Button)`
  margin: 0 0 1rem;
`

const ModalQueryResult = styled(QueryResult)`
  margin: 0 0 1rem;
`

const Plan = ({ className, me }) => {
  const [ loading, setLoading ] = useState(false)
  const [ processing, setProcessing ] = useState()

  const [ switchModalOpen, setSwitchModalOpen ] = useState(false)
  const [ selectedPlan, setSelectedPlan ] = useState()
  const [ selectedSchedule, setSelectedSchedule ] = useState()

  const currentPlanIsPaid = useMemo(() => me.sub.plan !== SUB.PLAN.BASIC, [ me ])
  const selectedPlanIsPaid = useMemo(() => selectedPlan !== SUB.PLAN.BASIC, [ selectedPlan ])

  const openSwitchModal = useCallback((plan, schedule) => {
    setSelectedPlan(plan)
    setSelectedSchedule(schedule)
    setSwitchModalOpen(true)
  }, [])

  const closeSwitchModal = useCallback(() => setSwitchModalOpen(false), [])

  const [ preparePlan, preparePlanResult ] = useSafeMutation(PreparePlanMutation)

  const switchToPlan = useCallback(async (plan, schedule) => {
    setLoading(true)

    try {
      const done = await preparePlanAndTakePayment({ user: me, preparePlan, plan, schedule })

      if (done) {
        if (SUB.PLAN.BASIC === plan) {
          window.location.reload()
        } else {
          setProcessing(true)
        }
      }
    } catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }, [ me, preparePlan ])

  return (
    <Container className={className}>
      {isSelfHosted() ? (
        <React.Fragment>
          <p>Current plan: Self-hosted</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Current plan: {me.sub.plan}{currentPlanIsPaid ? ` - ${me.sub.schedule}` : null}</p>
          <p>Plan status: {me.sub.status}</p>
          <BandwidthStatsThisMonth me={me} />
          {currentPlanIsPaid ? (
            <p>Next payment: {me.sub.nextPaymentAmount} on <PaymentDate>{me.sub.nextPaymentDate}</PaymentDate></p>
          ) : null}
        </React.Fragment>
      )}

      {isSelfHosted() ? null : (
        <ChangePlanContainer>
          <h2>Change plan</h2>
          {SHUTTING_DOWN ? (
            <WarnBox>Plan upgrades are currently disabled.</WarnBox>
          ) : (
            <React.Fragment>
              <StyledPricingSelection initialSchedule={me.sub.schedule} renderPlanFooter={(plan, schedule) =>
                <PricingButtonContainer>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {plan !== SUB.PLAN.PRO ? (
                    (plan === me.sub.plan && (plan === SUB.PLAN.BASIC || schedule === me.sub.schedule)) ? (
                      <CurrentPlan>Current plan</CurrentPlan>
                    ) : (
                      <Button onClick={() => openSwitchModal(plan, schedule)}>Switch to this plan</Button>
                    )
                  ) : (
                    <Button disabled={true}>Coming soon...</Button>
                  )}
                </PricingButtonContainer>
              } />

              <Modal isOpen={switchModalOpen} onBackgroundClick={closeSwitchModal}>
                <SwitchModalContainer>
                  <ModalSelectedPlan>Plan: {selectedPlan}{selectedPlanIsPaid ? <span> - {selectedSchedule}</span> : null}</ModalSelectedPlan>
                  <p>
                    {currentPlanIsPaid ? <span>Your current subscription will be cancelled.</span> : null}
                    {selectedPlanIsPaid ? <span>You will be billed immediately for the new subscription.</span> : null}
                  </p>
                  {processing ? (
                    <ProcessingPaymentAlert />
                  ) : (
                    <React.Fragment>
                      <SwitchButton
                        loading={loading}
                        onClick={() => switchToPlan(selectedPlan, selectedSchedule)}
                      >
                        Confirm new plan
                        </SwitchButton>
                      <ModalQueryResult {...preparePlanResult} hideLoading={true} />
                      {selectedPlanIsPaid ? <PaymentProcessorInfo /> : null}
                    </React.Fragment>
                  )}
                </SwitchModalContainer>
              </Modal>
            </React.Fragment>
          )}
        </ChangePlanContainer>
      )}
    </Container>
  )
}

export default Plan
