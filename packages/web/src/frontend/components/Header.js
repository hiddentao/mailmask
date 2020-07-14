import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { flex, childAnchors } from 'emotion-styled-utils'

import { isSelfHosted } from '../appConfig'
import { HomeLink, DashboardLink, HowItWorksLink, PricingLink, FaqLink, LoginLink, BlogLink } from './Link'
import Authenticated from './Authenticated'
import LogoLong from './LogoLong'
import IconButton from './IconButton'
import { GlobalConsumer } from '../contexts'

export const headerHeight = '75px'

const Container = styled.header`
  height: ${headerHeight};
  ${flex({ direction: 'row', justify: 'space-between', align: 'center' })};
  overflow: visible;
  padding: 0;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    padding: 0 0.5rem;
  }
`

const Brand = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'center', basis: 0 })};
  font-size: 1.5rem;
  cursor: pointer;
`

const ThemeToggleButton = styled(IconButton)`
  border: none;
  color: ${({ theme, inFloatingHeader }) => (inFloatingHeader ? theme.header.floating.themeSwitcher.iconColor : theme.header.themeSwitcher.iconColor)};
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

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    display: block;
    list-style: none;
    ${flex({ direction: 'row', basis: 0 })};
  }
`


const MobileNavContainer = styled.div`
  padding-right: 1rem;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    display: none;
    padding-right: 0;
  }
`


const NavLi = styled.li`
  display: block;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
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

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    margin-left: 1.2rem;

    a {
      padding: 0.5rem 1rem;
    }
  }
`

const StyledLogoLong = styled(LogoLong)`
  fill: ${({ theme, inFloatingHeader }) => (inFloatingHeader ? theme.header.floating.logoColor : theme.header.logoColor)};
  width: 148px;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    margin-left: -16px;
    width: 192px;
  }
`

const Header = ({ className, floating, onClickHome }) => {
  const createToggleThemeHandler = useCallback(({ themeName, setThemeName }) => e => {
    e.preventDefault()
    setThemeName('light' === themeName ? 'dark' : 'light')
  }, [])

  const loginLink = <LoginLink>Login</LoginLink>

  const dashboardLink = (
    <DashboardLi key='dashboard' inFloatingHeader={floating}>
      <Authenticated renderNotAuthenticated={loginLink} renderError={loginLink}>
        <DashboardLink>Dashboard</DashboardLink>
      </Authenticated>
    </DashboardLi>
  )

  return (
    <Container className={className}>
      <HomeLink>
        <Brand onClick={onClickHome}>
          <StyledLogoLong inFloatingHeader={floating} />
          <GlobalConsumer>
            {globalState => (
              <ThemeToggleButton
                title='Light/dark mode'
                inFloatingHeader={floating}
                icon={{ name: globalState.themeName === 'light' ? 'moon' : 'sun' }}
                onClick={createToggleThemeHandler(globalState)}
              />
            )}
          </GlobalConsumer>
        </Brand>
      </HomeLink>
      <DesktopNav inFloatingHeader={floating}>
        {isSelfHosted() ? null : (
          <React.Fragment>
            <NavLi key='how-it-works'><HowItWorksLink>How it works</HowItWorksLink></NavLi>
            <NavLi key='faq'><FaqLink>FAQ</FaqLink></NavLi>
            <NavLi key='pricing'><PricingLink>Pricing</PricingLink></NavLi>
            <NavLi key='blog'><BlogLink>Blog</BlogLink></NavLi>
          </React.Fragment>
        )}
        {dashboardLink}
      </DesktopNav>
      <MobileNavContainer inFloatingHeader={floating}>
        {dashboardLink}
      </MobileNavContainer>
    </Container>
  )
}

export default Header
