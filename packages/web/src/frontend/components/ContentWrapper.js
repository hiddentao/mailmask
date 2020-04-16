import React from 'react'
import styled from '@emotion/styled'

import MaxContentWidth from './MaxContentWidth'
import { maxContentWidth } from './Layout'

const Container = styled.div`
  background: ${({ theme }) => theme.contentWrapperBgColor};
  color: ${({ theme }) => theme.contentWrapperTextColor};
  padding: 2rem;
`

const ContentWrapper = ({ children, className }) => (
  <Container className={className}>
    <MaxContentWidth width={maxContentWidth}>
      {children}
    </MaxContentWidth>
  </Container>
)

export default ContentWrapper
