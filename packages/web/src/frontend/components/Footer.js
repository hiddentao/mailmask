import React from 'react'
import styled from '@emotion/styled'
import { flex, media, childAnchors } from 'emotion-styled-utils'

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

const Footer = ({ className }) => {
  return (
    <Container className={className}>
      <div>
        <a onClick={scrollToTop}>⇧ Back to top</a>
      </div>
    </Container>
  )
}

export default Footer
