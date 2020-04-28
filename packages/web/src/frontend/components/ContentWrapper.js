import React from 'react'
import styled from '@emotion/styled'
import { childAnchors } from 'emotion-styled-utils'

import MaxContentWidth from './MaxContentWidth'
import { maxContentWidth } from './Layout'

const Container = styled.div`
  background: ${({ theme }) => theme.contentWrapperBgColor};
  color: ${({ theme }) => theme.contentWrapperTextColor};
  padding: 2rem;

  ${({ theme }) => childAnchors({
    textColor: theme.contentWrapperAnchorTextColor,
    hoverTextColor: theme.contentWrapperAnchorHoverTextColor,
    hoverBgColor: theme.contentWrapperAnchorHoverBgColor,
    borderBottomColor: theme.contentWrapperAnchorBorderBottomColor,
  })}
`

const ContentWrapper = ({ children, className }) => (
  <Container className={className}>
    <MaxContentWidth width={maxContentWidth}>
      {children}
    </MaxContentWidth>
  </Container>
)

export default ContentWrapper
