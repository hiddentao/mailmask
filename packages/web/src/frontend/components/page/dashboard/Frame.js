import React, { useMemo, useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'
import MobileSidebar from 'react-sidebar'
import { SUB, _, buildMaskAddress } from '@mailmask/utils'

import { withApollo } from '../../../hoc'
import { getAppConfig } from '../../../appConfig'
import Layout from '../../Layout'
import PaymentDate from '../../PaymentDate'
import ContentWrapper from '../../ContentWrapper'
import Seo from '../../Seo'
import { DashboardLink } from '../../Link'
import ErrorBox from '../../ErrorBox'
import Button from '../../Button'
import SubStatus from '../../SubStatus'
import Icon from '../../Icon'
import Sidebar from '../../page/dashboard/Sidebar'
import Masks from '../../page/dashboard/Masks'
import Account from '../../page/dashboard/Account'
import Plan from '../../page/dashboard/Plan'
import FinalizePlan from '../../page/dashboard/FinalizePlan'
import AuthenticatedAndFullySignedUp from '../../AuthenticatedAndFullySignedUp'

const { DOMAIN } = getAppConfig()

const StyledContentWrapper = styled(ContentWrapper)``

const DashContainer = styled.div`
  h1 {
    margin: 0 0 2rem;
  }
`

const DesktopContainer = styled.div`
  display: none;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: block;
    ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start' })};
  }
`

const MobileContainer = styled.div`
  display: block;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
  }
`

const MobileSidebarToggleButton = styled(Button)`
  position: relative;
  margin: -1rem 0 0 0;
  border-radius: 0;
  padding: 0.1em 0.2em;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
  }
`

const StyledSidebar = styled(Sidebar)`
  padding: 1rem 3rem 1rem 1rem;
  background-color: ${({ theme }) => theme.dashboardPage.sidebar.mobile.bgColor};
  min-height: 100vh;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    background-color: ${({ theme }) => theme.dashboardPage.sidebar.bgColor};
    border-right: 1px solid ${({ theme }) => theme.dashboardPage.sidebar.borderColor};
    padding-right: 3rem;
    min-height: auto;
  }
`

const Main = styled.div`
  width: 100%;
  padding: 1rem 0 0;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    padding: 0 0 0 3rem;
  }

  strong {
    ${font('body', 'bold')};
  }
`

const StyledMasks = styled(Masks)`
  margin: 3rem 0;
`

const AccountProblem = styled(ErrorBox)`
  margin-bottom: 2rem;
`

const AliasesPanel = ({ me }) => (
  <Main>
    <h1>My aliases</h1>
    <p>Send an email to <strong>{buildMaskAddress('test', me.usernames[0].username, DOMAIN)}</strong> to see the alias <strong>"test"</strong> show up below.</p>
    <StyledMasks me={me} />
  </Main>
)

const AccountPanel = ({ me }) => (
  <Main>
    <h1>My account</h1>
    <Account me={me} />
  </Main>
)

const FinalizePlanPanel = ({ me }) => (
  <Main>
    <h1>Finalize plan</h1>
    <FinalizePlan me={me} />
  </Main>
)


const PlanPanel = ({ me }) => (
  <Main>
    <h1>My plan</h1>
    <Plan me={me} />
  </Main>
)

const Dash = ({ me, panel = 'main' }) => {
  const subscriptionStatus = useMemo(() => _.get(me, 'sub.status'), [ me ])

  const subscriptionInactive = useMemo(() => {
    return (subscriptionStatus !== SUB.STATUS.ACTIVE && subscriptionStatus !== SUB.STATUS.PAYMENT_FAILED)
  }, [ subscriptionStatus ])

  const subscriptionPaymentFailed = useMemo(() => {
    return (subscriptionStatus === SUB.STATUS.PAYMENT_FAILED)
  }, [ subscriptionStatus ])

  const [ mobileSidebarOpen, setMobileSidebarOpen ] = useState(false)

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }, [ mobileSidebarOpen ])

  const sidebarContent = <StyledSidebar onSelectItem={toggleMobileSidebar} />

  const mainContent = useMemo(() => {
    if (!subscriptionInactive) {
      switch (panel) {
        case 'account':
          return <AccountPanel me={me} />
        case 'plan':
          return <PlanPanel me={me} />
        default:
          return <AliasesPanel me={me} />
      }
    } else {
      return <FinalizePlanPanel me={me} />
    }
  }, [ me, subscriptionInactive, panel ])

  return (
    <DashContainer>
      {(subscriptionInactive && panel !== 'plan') ? (
        <AccountProblem>
          Your subscription is currently inactive (<SubStatus status={subscriptionStatus} />)!
          Please <DashboardLink panel='plan'>check your Plan</DashboardLink>  to fix this.
        </AccountProblem>
      ) : null}
      {subscriptionPaymentFailed ? (
        <AccountProblem>
          Your latest subscription payment failed. We will attempt to take the payment
          again on <PaymentDate>{me.sub.nextPaymentDate}</PaymentDate>. If this fails then your
          subscription will be automatically cancelled.
        </AccountProblem>
      ) : null}
      {subscriptionInactive ? null : (
        <MobileSidebarToggleButton onClick={toggleMobileSidebar}>
          Menu <Icon name='chevron-right' />
        </MobileSidebarToggleButton>
      )}
      <DesktopContainer>
        {subscriptionInactive ? null : sidebarContent}
        {mainContent}
      </DesktopContainer>
      <MobileContainer>
        <MobileSidebar
          open={mobileSidebarOpen && !subscriptionInactive}
          onSetOpen={toggleMobileSidebar}
          sidebar={sidebarContent}
          styles={{
            root: {
              position: 'static',
            },
            content: {
              position: 'static',
            },
          }}
        >
          {mainContent}
        </MobileSidebar>
      </MobileContainer>
    </DashContainer>
  )
}

const DashboardPage = props => {
  return (
    <Layout>
      <Seo title='Dashboard' />
      <StyledContentWrapper>
        <AuthenticatedAndFullySignedUp>
          {me => <Dash me={me} {...props}/>}
        </AuthenticatedAndFullySignedUp>
      </StyledContentWrapper>
    </Layout>
  )
}

export default withApollo(DashboardPage)


