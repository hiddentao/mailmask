import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import MobileSidebar from 'react-sidebar'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import Button from '../src/frontend/components/Button'
import Icon from '../src/frontend/components/Icon'
import Sidebar from '../src/frontend/components/page/dashboard/Sidebar'
import Masks from '../src/frontend/components/page/dashboard/Masks'
import Account from '../src/frontend/components/page/dashboard/Account'
import AuthenticatedAndFullySignedUp from '../src/frontend/components/AuthenticatedAndFullySignedUp'

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
  margin: -1rem 0 0 -1rem;
  border-radius: 0;
  padding: 0.1em 0.2em;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
  }
`

const StyledSidebar = styled(Sidebar)`
  padding: 1rem 3rem 1rem 1rem;
  background-color: ${({ theme }) => theme.dashboardPageMobileSidebarBgColor};
  min-height: 100vh;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    padding-right: 3rem;
    min-height: auto;
  }
`

const Main = styled.div`
  width: 100%;
  padding: 1rem 0 0;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    border-left: 1px solid ${({ theme }) => theme.dashboardPageSidebarBorderColor};
    padding: 0 0 0 3rem;
  }
`

const StyledMasks = styled(Masks)`
  margin: 3rem 0;
`

const Dash = ({ username }) => {
  const [ mobileSidebarOpen, setMobileSidebarOpen ] = useState(false)

  const [ panel, setPanel ] = useState('aliases')

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }, [ mobileSidebarOpen ])

  const onSidebarSelect = useCallback(newPanel => {
    if (newPanel !== panel) {
      setPanel(newPanel)
      setMobileSidebarOpen(false)
    }
  }, [ panel ])

  const sidebarContent = <StyledSidebar onSelect={onSidebarSelect} />

  const mainContent = (
    <Main>
      {panel === 'aliases' ? (
        <React.Fragment>
          <h1>My aliases</h1>
          <StyledMasks username={username} />
        </React.Fragment>
      ) : null}
      {panel === 'account' ? (
        <React.Fragment>
          <h1>My account</h1>
          <Account />
        </React.Fragment>
      ) : null}
    </Main>
  )

  return (
    <DashContainer>
      <MobileSidebarToggleButton onClick={toggleMobileSidebar}>
        Menu <Icon name='chevron-right' />
      </MobileSidebarToggleButton>
      <DesktopContainer>
        {sidebarContent}
        {mainContent}
      </DesktopContainer>
      <MobileContainer>
        <MobileSidebar
          open={mobileSidebarOpen}
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

const DashboardPage = () => {
  return (
    <Layout>
      <Seo title='Dashboard' />
      <StyledContentWrapper>
        <AuthenticatedAndFullySignedUp>
          {({ username }) => <Dash username={username} />}
        </AuthenticatedAndFullySignedUp>
      </StyledContentWrapper>
    </Layout>
  )
}

export default withApollo(DashboardPage)


