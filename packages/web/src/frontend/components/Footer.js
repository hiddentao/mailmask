import React from 'react'
import styled from '@emotion/styled'
import { flex, font, childAnchors } from 'emotion-styled-utils'

import {
  HomeLink,
  PricingLink,
  FaqLink,
  AboutLink,
  HelpLink,
  DashboardLink,
  TermsLink,
  PrivacyLink,
  LoginLink,
  LogoutLink,
} from './Link'
import Authenticated from './Authenticated'
import { scrollToTop } from '../utils/functions'

const Container = styled.footer`
  color: ${({ theme }) => theme.footerTextColor};
  padding: 1.5rem;

  & > div {
    margin-bottom: 2rem;

    &:last-child {
      margin: 0;
    }

    li {
      line-height: 2em;
    }
  }

  ${({ theme }) => childAnchors({
    textColor: theme.footerAnchorTextColor,
    hoverTextColor: theme.footerAnchorHoverTextColor,
    hoverBgColor: theme.footerAnchorHoverBgColor,
    borderBottomColor: theme.footerAnchorBorderBottomColor
  })};

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'row', justify: 'space-between', align: 'flex-start' })};
    padding: 3rem 1.5rem 2rem;

    & > div {
      margin: 0;
    }
  }
`

const Menu = styled.div`
  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start' })};
  }
`

const MenuColumn = styled.ul`
  display: block;
  padding-bottom: 2rem;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    padding-right: 3rem;
    padding-bottom: 0;
  }
`

const MenuNavLink = styled.li`
  display: block;
`

const SpecialMenuNavLink = styled.li`
  ${font('body', 'bold')}
`


const Footer = ({ className }) => {
  const loginLink = <LoginLink>Login</LoginLink>

  return (
    <Container className={className}>
      <Menu>
        <MenuColumn>
          <MenuNavLink><HomeLink>Home</HomeLink></MenuNavLink>
          <MenuNavLink><PricingLink>Pricing</PricingLink></MenuNavLink>
          <MenuNavLink><FaqLink>FAQ</FaqLink></MenuNavLink>
          <MenuNavLink><HelpLink>Help & support</HelpLink></MenuNavLink>
          <MenuNavLink><TermsLink>Terms</TermsLink> / <PrivacyLink>Privacy</PrivacyLink></MenuNavLink>
          <MenuNavLink><AboutLink>About</AboutLink></MenuNavLink>
        </MenuColumn>
        <MenuColumn>
          <SpecialMenuNavLink>
            <Authenticated renderNotAuthenticated={loginLink} renderError={loginLink}>
              <DashboardLink>My dashboard</DashboardLink>
            </Authenticated>
          </SpecialMenuNavLink>
          <Authenticated renderNotAuthenticated={<span />} renderError={<span />}>
            <LogoutLink>Logout</LogoutLink>
          </Authenticated>
        </MenuColumn>
      </Menu>
      <div>
        <a onClick={scrollToTop}>⇧ Back to top</a>
      </div>
    </Container>
  )
}

export default Footer
