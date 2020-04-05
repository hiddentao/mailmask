import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import Headroom from 'react-headroom'

import MaxContentWidth from './MaxContentWidth'
import Header from './Header'
import Footer from './Footer'

export const maxContentWidth = '800px'

const Layout = styled.div``

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
