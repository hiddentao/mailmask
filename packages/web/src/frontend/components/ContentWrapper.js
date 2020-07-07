import React from 'react'
import styled from '@emotion/styled'
import { childAnchors, boxShadow } from 'emotion-styled-utils'

import MaxContentWidth from './MaxContentWidth'
import ContentPointImage from './ContentPointImage'
import { maxContentWidth } from './Layout'

const Container = styled.div`
  position: relative;
  background: ${({ theme, type }) => theme.contentWrapper[type].bgColor};
  ${({ theme, type }) => boxShadow({ color: theme.contentWrapper[type].shadowColor })};
  color: ${({ theme, type }) => theme.contentWrapper[type].textColor};
  padding: 2rem 2rem 3rem;
  ${({ theme, type }) => childAnchors(theme.contentWrapper[type].anchor)};
`

const ContentWrapper = ({ children, type = 'normal', prevType, className }) => (
  <Container className={className} type={type}>
    <MaxContentWidth width={maxContentWidth}>
      {children}
      {prevType ? <ContentPointImage type={prevType} /> : null}
    </MaxContentWidth>
  </Container>
)

export default ContentWrapper
