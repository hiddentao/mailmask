import React from 'react'
import styled from '@emotion/styled'
import { flex, childAnchors } from 'emotion-styled-utils'

import {
  HomeLink,
  HowItWorksLink,
  PricingLink,
  FaqLink,
  AboutLink,
  HelpLink,
  DashboardLink,
  BlogLink,
  TermsLink,
  PrivacyLink,
  LoginLink,
  LogoutLink,
  TwitterLink,
  GithubLink,
} from './Link'
import Authenticated from './Authenticated'
import { scrollToTop } from '../utils/functions'
import { isSelfHosted } from '../appConfig'

const Container = styled.footer`
  color: ${({ theme }) => theme.footerTextColor};
  padding: 1.5rem;
  font-size: 0.8rem;

  & > div {
    margin-bottom: 2rem;

    &:last-child {
      margin: 0;
    }

    li {
      line-height: 2em;
    }
  }

  ${({ theme }) => childAnchors(theme.footer.anchor)};

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    ${flex({ direction: 'row', justify: 'space-between', align: 'flex-start' })};
    padding: 3rem 1.5rem 2rem;

    & > div {
      margin: 0;
    }
  }
`

const Menu = styled.div`
  ${flex({ direction: 'column-reverse', justify: 'flex-start', align: 'flex-start' })};

  ${({ theme }) => theme.media.when({ minW: 'tablet' })} {
    ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start' })};
  }
`

const MenuColumn = styled.ul`
  display: block;
  padding: 0 0 2rem 0;

  ${({ theme }) => theme.media.when({ minW: 'tablet' })} {
    padding: 0 3rem 0 0;
  }
`

const MenuNavLink = styled.li`
  display: block;
`

const MenuTermsNavLink = styled(MenuNavLink)`
  margin: 1rem 0 0;
`

const SpecialMenuNavLink = styled(MenuNavLink)`
  ${({ theme }) => theme.font('body', 'bold')}
  margin-bottom: 0.3rem;
`


const Footer = ({ className }) => {
  const loginLink = <LoginLink>Login</LoginLink>

  return (
    <Container className={className}>
      <Menu>
        <MenuColumn>
          <MenuNavLink><HomeLink>Home</HomeLink></MenuNavLink>
          {isSelfHosted() ? null : (
            <React.Fragment>
              <MenuNavLink><HowItWorksLink>How it works</HowItWorksLink></MenuNavLink>
              <MenuNavLink><PricingLink>Pricing</PricingLink></MenuNavLink>
              <MenuNavLink><FaqLink>FAQ</FaqLink></MenuNavLink>
              <MenuNavLink><HelpLink>Help & Support</HelpLink></MenuNavLink>
              <MenuNavLink><AboutLink>About</AboutLink></MenuNavLink>
              <MenuTermsNavLink><TermsLink>Terms</TermsLink> & <PrivacyLink>Privacy</PrivacyLink></MenuTermsNavLink>
            </React.Fragment>
          )}
        </MenuColumn>
        <MenuColumn>
          <MenuNavLink><BlogLink>Blog</BlogLink></MenuNavLink>
          <MenuNavLink><TwitterLink>Twitter</TwitterLink></MenuNavLink>
          <MenuNavLink><GithubLink>Github</GithubLink></MenuNavLink>
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
