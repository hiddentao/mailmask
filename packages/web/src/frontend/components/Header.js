import React from 'react'
import styled from '@emotion/styled'
import { flex, font, childAnchors } from 'emotion-styled-utils'

import { Link, DashboardLink, PricingLink, LoginLink } from './Link'
import Authenticated from './Authenticated'

export const headerHeight = '75px'

const Container = styled.header`
  height: ${headerHeight};
  background: ${({ theme }) => theme.headerBgColor};
  color: ${({ theme }) => theme.headerTextColor};
  ${flex({ direction: 'row', justify: 'space-between', align: 'center' })};
  padding: 0 1rem;
  overflow: visible;
`

const Brand = styled.div`
  display: block;
  ${font('header', 'thin')};
  color: ${({ theme }) => theme.headerTextColor};
  font-size: 1.5rem;
  cursor: pointer;
`

const DesktopNav = styled.ul`
  display: none;

  ${({ theme }) => childAnchors({
    textColor: theme.navAnchorTextColor,
    hoverTextColor: theme.navAnchorHoverTextColor,
    hoverBgColor: theme.navAnchorHoverBgColor,
    borderBottomColor: theme.navAnchorBorderBottomColor
  })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: block;
    list-style: none;
    ${flex({ direction: 'row', basis: 0 })};
  }
`


const NavLi = styled.li`
  display: block;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    a {
      display: block;
      font-size: 0.9rem;
      padding: 0.7rem 1rem;
      white-space: nowrap;
    }
  }
`

const DashboardLi = styled.li`
  display: block;
  border: 1px solid ${({ theme }) => theme.navSpecialAnchorBorderColor};
  border-radius: 5px;

  a {
    display: block;
    font-size: 1.1rem;
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

const MobileNavContainer = styled.div`
  ${flex({ direction: 'row', justify: 'flex-end', align: 'center', wrap: 'no-wrap', basis: 0 })};

  ${({ theme }) => childAnchors({
    textColor: theme.navAnchorTextColor,
    hoverTextColor: theme.navAnchorHoverTextColor,
    hoverBgColor: theme.navAnchorHoverBgColor,
    borderBottomColor: theme.navAnchorBorderBottomColor
  })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
  }
`

const Header = ({ className, onClickHome }) => {
  const loginLink = <LoginLink>Login</LoginLink>

  const dashboardLink = (
    <DashboardLi key='dashboard'>
      <Authenticated renderNotAuthenticated={loginLink} renderError={loginLink}>
        <DashboardLink>My dashboard</DashboardLink>
      </Authenticated>
    </DashboardLi>
  )

  const navLinks = [
    <NavLi key='pricing'><PricingLink>Pricing</PricingLink></NavLi>
  ]

  const desktopNavLinks = navLinks.concat(dashboardLink)

  return (
    <Container className={className}>
      <Link href='/'>
        <Brand onClick={onClickHome}>Mailmask</Brand>
      </Link>
      <DesktopNav>{desktopNavLinks}</DesktopNav>
      <MobileNavContainer>
        {dashboardLink}
      </MobileNavContainer>
    </Container>
  )
}

export default Header
