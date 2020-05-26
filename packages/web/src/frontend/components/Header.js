import React from 'react'
import styled from '@emotion/styled'
import { flex, childAnchors } from 'emotion-styled-utils'

import { HomeLink, DashboardLink, HowItWorksLink, PricingLink, FaqLink, LoginLink } from './Link'
import Authenticated from './Authenticated'
import Logo from './Logo'

export const headerHeight = '75px'

const Container = styled.header`
  height: ${headerHeight};
  ${flex({ direction: 'row', justify: 'space-between', align: 'center' })};
  overflow: visible;
`

const Brand = styled.div`
  display: block;
  font-size: 1.5rem;
  cursor: pointer;
`

const navLinkStyles = ({ theme, inFloatingHeader }) => childAnchors({
  ...(inFloatingHeader ? theme.header.floating.navAnchor : theme.header.navAnchor),
  borderType: 'border',
  extraStyles: `
    border-radius: 5px;
    border-width: 2px;
  `
})


const DesktopNav = styled.ul`
  display: none;
  ${({ theme, inFloatingHeader }) => navLinkStyles({ theme, inFloatingHeader })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: block;
    list-style: none;
    ${flex({ direction: 'row', basis: 0 })};
  }
`


const MobileNavContainer = styled.div`
  padding-right: 1rem;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
    padding-right: 0;
  }
`


const NavLi = styled.li`
  display: block;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    a {
      display: block;
      font-size: 1rem;
      padding: 0.7rem 1rem;
      white-space: nowrap;
    }
  }
`

const DashboardLi = styled.li`
  display: block;

  ${({ theme, inFloatingHeader }) => childAnchors({
    ...(inFloatingHeader ? theme.header.floating.specialNavAnchor : theme.header.specialNavAnchor),
    borderType: 'border',
    extraStyles: `
      border-radius: 5px;
      border-width: 2px;
    `,
  })};

  a {
    display: block;
    font-size: 1rem;
    padding: 0.7rem 1rem;
    white-space: nowrap;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin-left: 1.2rem;

    a {
      padding: 0.5rem 1rem;
    }
  }
`

const StyledLogo = styled(Logo)`
  fill: ${({ theme, inFloatingHeader }) => (inFloatingHeader ? theme.header.floating.logoColor : theme.header.logoColor)};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin-left: -16px;
  }
`

const Header = ({ className, floating, onClickHome }) => {
  const loginLink = <LoginLink>Login</LoginLink>

  const dashboardLink = (
    <DashboardLi key='dashboard' inFloatingHeader={floating}>
      <Authenticated renderNotAuthenticated={loginLink} renderError={loginLink}>
        <DashboardLink>My dashboard</DashboardLink>
      </Authenticated>
    </DashboardLi>
  )

  return (
    <Container className={className}>
      <HomeLink>
        <Brand onClick={onClickHome}>
          <StyledLogo inFloatingHeader={floating} />
        </Brand>
      </HomeLink>
      <DesktopNav inFloatingHeader={floating}>
        <NavLi key='how-it-works'><HowItWorksLink>How it works</HowItWorksLink></NavLi>
        <NavLi key='pricing'><PricingLink>Pricing</PricingLink></NavLi>
        <NavLi key='faq'><FaqLink>FAQ</FaqLink></NavLi>
        {dashboardLink}
      </DesktopNav>
      <MobileNavContainer inFloatingHeader={floating}>
        {dashboardLink}
      </MobileNavContainer>
    </Container>
  )
}

export default Header
