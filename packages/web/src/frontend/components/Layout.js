import React, { useState, useCallback } from 'react'
import CookieConsent from 'react-cookie-consent'
import { ClassNames } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import styled from '@emotion/styled'
import Headroom from 'react-headroom'
import { buttonStyles, childAnchors } from 'emotion-styled-utils'

import MaxContentWidth from './MaxContentWidth'
import Header from './Header'
import Footer from './Footer'
import { PrivacyLink } from './Link'
import { ModalProvider } from './Modal'

export const maxContentWidth = '1024px'

const Layout = styled.div`
  min-height: 100vh;
  ${({ theme }) => theme.font('body')};
  background: ${({ theme }) => theme.layout.bgColor};
  color: ${({ theme }) => theme.layout.textColor};
`

const HeaderWrapper = styled.div`
  background: ${({ floating, theme }) => (floating ? theme.header.floating.wrapper.bgColor : theme.header.wrapper.bgColor)};
  transition: all 0.3s linear;
`

const StyledHeader = styled(Header)`
`

const PageLayout = ({ children }) => {
  const theme = useTheme()
  const [ floatingHeader, setFloatingHeader ] = useState(false)

  const onHeaderFloat = useCallback(() => {
    setFloatingHeader(true)
  }, [])

  const onHeaderUnfloat = useCallback(() => {
    setFloatingHeader(false)
  }, [])

  return (
    <Layout>
      <ModalProvider>
        <ClassNames>
          {({ css }) => (
            <CookieConsent
              disableStyles={true}
              containerClasses={css`
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100vw;
                z-index: 1000001;
                padding: 0 0.5rem;
                background-color: ${theme.consentBar.bgColor};
                color: ${theme.consentBar.textColor};
                text-align: center;
              `}
              contentClasses={css`
                display: inline-block;
                ${theme.font('body')};
                font-size: 0.8rem;
                margin: 0.5rem;

                ${childAnchors(theme.consentBar.anchor)};
              `}
              buttonClasses={css`
                display: inline-block;
                font-size: 0.8rem;
                padding: 0.4em 0.8em;
                border-radius: 5px;
                margin: 0.5rem 0;

                ${buttonStyles({
                ...theme.button,
              })}
              `}
              buttonText='Ok'
              acceptOnScroll={true}
            >
              By using this website you agree to our <PrivacyLink>privacy policy</PrivacyLink>.
            </CookieConsent>
          )}
        </ClassNames>
        <Headroom onPin={onHeaderFloat} onUnfix={onHeaderUnfloat}>
          <HeaderWrapper floating={floatingHeader}>
            <MaxContentWidth width={maxContentWidth}>
              <StyledHeader floating={floatingHeader} />
            </MaxContentWidth>
          </HeaderWrapper>
        </Headroom>
        {children}
        <MaxContentWidth width={maxContentWidth}>
          <Footer />
        </MaxContentWidth>
      </ModalProvider>
    </Layout>
  )
}

export default PageLayout
