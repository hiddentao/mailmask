import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex, font, childAnchors, boxShadow } from 'emotion-styled-utils'

import { Link, AccountLink } from './Link'
import Authenticated from './Authenticated'
import Button from './Button'
import Icon from './Icon'

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

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: block;
    list-style: none;
    ${flex({ direction: 'row', basis: 0 })};

    ${({ theme }) => childAnchors({
    textColor: theme.navAnchorTextColor,
    hoverTextColor: theme.navAnchorHoverTextColor,
    hoverBgColor: theme.navAnchorHoverBgColor,
    borderBottomColor: theme.navAnchorBorderBottomColor
  })};
  }
`

const MobileNav = styled.ul`
  list-style: none;
  ${flex({ direction: 'column', basis: 0 })}
  z-index: 5;
  position: fixed;
  top: ${headerHeight};
  right: 10px;
  min-width: 9rem;
  border-radius: 5px;
  ${({ theme }) => boxShadow({ color: theme.mobileNavBoxShadow })};
  background-color: ${({ theme }) => theme.mobileNavBgColor};

  ${({ theme }) => childAnchors({
    textColor: theme.mobileNavAnchorTextColor,
    hoverTextColor: theme.mobileNavAnchorHoverTextColor,
    hoverBgColor: theme.mobileNavAnchorHoverBgColor,
    borderBottomColor: theme.mobileNavAnchorBorderBottomColor
  })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
  }
`

const NavLi = styled.li`
  display: block;
  border-bottom: 1px solid ${({ theme }) => theme.mobileNavAnchorTextColor};
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

  a {
    display: block;
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
    white-space: nowrap;
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    border-bottom: none;
    width: auto;

    a {
      display: inline-block;
      padding: 0.5rem 1rem;
    }
  }
`

const DashboardLi = styled.li`
  display: block;
  width: 100%;

  a {
    display: block;
    font-size: 0.9rem;
    padding: 0.7rem 1rem;

    ${flex({ direction: 'row', justify: 'flex-start', align: 'center', wrap: 'no-wrap' })};

    span {
      margin-left: 0.5rem;
    }
  }

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    margin-left: 20px;

    a {
      padding: 0.5rem 1rem;
    }
  }
`

const MobileNavButton = styled(Button)`
  display: block;
  background-color: transparent;
  padding: 0.5em;
  ${({ theme }) => theme.headerTextColor};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    display: none;
  }
`

const Header = ({ className, onClickHome, children }) => {
  const [ mobileNavOpen, setMobileNavOpen ] = useState(false)

  const toggleMobileMenu = useCallback(() => setMobileNavOpen(!mobileNavOpen), [ mobileNavOpen ])

  const navLinks = (
    <React.Fragment>
      <NavLi><Link href='/pricing'>Pricing</Link></NavLi>
      <DashboardLi>
        <Authenticated renderNotAuthenticated={() => <Link href='/login'>Login</Link>}>
          {() => <AccountLink>My account</AccountLink>}
        </Authenticated>
      </DashboardLi>
    </React.Fragment>
  )

  return (
    <Container className={className}>
      <Link href='/'>
        <Brand onClick={onClickHome}>camomail</Brand>
      </Link>
      {children}
      <DesktopNav>{navLinks}</DesktopNav>
      <MobileNavButton onClick={toggleMobileMenu}><Icon name='bars' /></MobileNavButton>
      {mobileNavOpen ? (
        <MobileNav>{navLinks}</MobileNav>
      ) : null}
    </Container>
  )
}

export default Header
