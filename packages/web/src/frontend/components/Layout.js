import React, { useState, useCallback } from 'react'
import CookieConsent from "react-cookie-consent"
import styled from '@emotion/styled'
import Headroom from 'react-headroom'
import { font } from 'emotion-styled-utils'

import MaxContentWidth from './MaxContentWidth'
import Header from './Header'
import Footer from './Footer'

export const maxContentWidth = '1024px'

const Layout = styled.div`
  min-height: 200vh;
  ${font('body')};
  background: ${({ theme }) => theme.layoutBgColor};
  color: ${({ theme }) => theme.layoutTextColor};
`

const HeaderWrapper = styled.div`
  background: ${({ floating, theme }) => (floating ? theme.headerWrapperFloatingBgColor : theme.headerWrapperBgColor)};
  transition: all 0.3s linear;
`

const StyledHeader = styled(Header)`
  z-index: 1;
`

const PageLayout = ({ children }) => {
  const [ floatingHeader, setFloatingHeader ] = useState(false)

  const onHeaderFloat = useCallback(() => {
    setFloatingHeader(true)
  }, [])

  const onHeaderUnfloat = useCallback(() => {
    setFloatingHeader(false)
  }, [])

  return (
    <Layout>
      <CookieConsent debug={true}>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Headroom onPin={onHeaderFloat} onUnfix={onHeaderUnfloat}>
        <HeaderWrapper floating={!!floatingHeader}>
          <MaxContentWidth width={maxContentWidth}>
            <StyledHeader />
          </MaxContentWidth>
        </HeaderWrapper>
      </Headroom>
      {children}
      <MaxContentWidth width={maxContentWidth}>
        <Footer />
      </MaxContentWidth>
    </Layout>
  )
}

export default PageLayout
