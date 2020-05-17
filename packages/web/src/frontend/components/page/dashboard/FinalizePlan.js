import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { SUB } from '@mailmask/utils'

import { PreparePlanMutation } from '../../../../graphql/mutations'
import { useSafeMutation } from '../../../hooks/apollo'
import { preparePlanAndTakePayment } from '../../../utils/payment'
import Button from '../../Button'
import QueryResult from '../../QueryResult'
import ProcessingPaymentAlert from '../../ProcessingPaymentAlert'
import PricingSelection from '../../PricingSelection'

const Container = styled.div`
  p {
    margin: 1rem 0;
  }
`

const StyledPricingSelection = styled(PricingSelection)`
  font-size: 80%;
`

const PricingButtonContainer = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
`

const FinalizeButton = styled(Button)`
  margin: 0 0 2rem;
`

const Plan = ({ className, me }) => {
  const [ loading, setLoading ] = useState(false)
  const [ processing, setProcessing ] = useState()
  const [ preparePlan, preparePlanResult ] = useSafeMutation(PreparePlanMutation)

  const selectPlan = useCallback(async (plan, schedule) => {
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
      {processing ? (
        <ProcessingPaymentAlert />
      ) : (
        <React.Fragment>
          <p>Please confirm your plan:</p>
          <StyledPricingSelection initialSchedule={me.sub.schedule} renderPlanFooter={(plan, schedule) =>
            <PricingButtonContainer>
              {plan !== SUB.PLAN.PRO ? (
                <FinalizeButton loading={loading} onClick={() => selectPlan(plan, schedule)}>Select</FinalizeButton>
              ) : (
                <Button disabled={true}>Coming soon...</Button>
              )}
            </PricingButtonContainer>
          } />
          <QueryResult {...preparePlanResult} />
        </React.Fragment>
      )}
    </Container>
  )
}

export default Plan
