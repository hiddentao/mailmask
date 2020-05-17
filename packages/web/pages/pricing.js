import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'
import { SUB } from '@mailmask/utils'

import { FAQ } from '../src/frontend/constants'
import { withApollo } from '../src/frontend/hoc'
import { FaqLink } from '../src/frontend/components/Link'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Button from '../src/frontend/components/Button'
import GetStartedForm from '../src/frontend/components/GetStartedForm'
import PricingSelection from '../src/frontend/components/PricingSelection'
import FaqBlock from '../src/frontend/components/FaqBlock'
import Seo from '../src/frontend/components/Seo'
import { Modal } from '../src/frontend/components/Modal'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
`

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
`

const StyledPricingSelection = styled(PricingSelection)`
  flex: 0;
  margin: 1rem 0 3rem;
`

const StyledGetStartedForm = styled(GetStartedForm)`
  margin: 1rem 0 0;
`

const SignupButtonContainer = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
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

const SignupModalContainer = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
  width: 100%;
  height: 100%;
  padding: 2rem;
`

const ModalP = styled.p`
  ${font('body')};
  margin-bottom: 1rem;
`

const ModalSelectedPlan = styled.p`
  ${font('body', 'bold')};
  font-size: 140%;
  margin-bottom: 2rem;
`


const PricingPage = () => {
  const [ selectedPlan, setSelectedPlan ] = useState()
  const [ selectedSchedule, setSelectedSchedule ] = useState()
  const [ signupModalOpen, setSignupModalOpen ] = useState(false)

  const openSignupModal = useCallback((plan, schedule) => {
    setSelectedPlan(plan)
    setSelectedSchedule(schedule)
    setSignupModalOpen(true)
  }, [])

  const closeSignupModal = useCallback(() => setSignupModalOpen(false), [])

  return (
    <Layout>
      <Seo title='Pricing' />
      <ContentWrapper>
        <Container>
          <H1>Pricing</H1>
          <StyledPricingSelection renderPlanFooter={(plan, schedule) =>
            <SignupButtonContainer>
              {plan !== SUB.PLAN.PRO ? (
                <Button onClick={() => openSignupModal(plan, schedule)}>Sign up</Button>
              ) : (
                <Button disabled={true}>Coming soon...</Button>
              )}
            </SignupButtonContainer>
          }/>
        </Container>
        <FaqContainer>
          <h2>Frequently asked questions</h2>
          <FaqBlocks>
            <StyledFaqBlock data={FAQ.TRIAL_COLUMN_1} initiallyExpanded={true} />
            <StyledFaqBlock data={FAQ.TRIAL_COLUMN_2} initiallyExpanded={true} />
          </FaqBlocks>
          <p>For more answers, please visit our <FaqLink>FAQ page</FaqLink>.</p>
        </FaqContainer>

        <Modal isOpen={signupModalOpen} onBackgroundClick={closeSignupModal} width='500px'>
          <SignupModalContainer>
            <ModalSelectedPlan>Plan: {selectedPlan}, paid {selectedSchedule}</ModalSelectedPlan>
            <ModalP>Enter your email address to sign up:</ModalP>
            <StyledGetStartedForm plan={selectedPlan} schedule={selectedSchedule} />
          </SignupModalContainer>
        </Modal>

      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(PricingPage)

