import React from 'react'
import styled from '@emotion/styled'
import { childAnchors, boxShadow } from 'emotion-styled-utils'

import MaxContentWidth from './MaxContentWidth'
import { maxContentWidth } from './Layout'

const Container = styled.div`
  background: ${({ theme }) => theme.contentWrapper.bgColor};
  ${({ theme }) => boxShadow({ color: theme.contentWrapper.shadowColor })};
  color: ${({ theme }) => theme.contentWrapper.textColor};
  padding: 2rem 2rem 3rem;

  ${({ theme }) => childAnchors(theme.contentWrapper.anchor)};
`

const ContentWrapper = ({ children, className }) => (
  <Container className={className}>
    <MaxContentWidth width={maxContentWidth}>
      {children}
    </MaxContentWidth>
  </Container>
)

export default ContentWrapper
