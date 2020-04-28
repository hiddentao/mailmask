import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import LinkButton from '../../LinkButton'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'flex-start', basis: 0 })};
`

const StyledLinkButton = styled(LinkButton)`
  margin-bottom: 1rem;
  text-align: left;
  white-space: nowrap;
`

const Sidebar = ({ className, onSelect }) => {
  const handle = useMemo(() => {
    return {
      aliases: () => onSelect('aliases'),
      account: () => onSelect('account'),
    }
  }, [ onSelect ])

  return (
    <Container className={className}>
      <StyledLinkButton onClick={handle.aliases}>My aliases</StyledLinkButton>
      <StyledLinkButton onClick={handle.account}>My account</StyledLinkButton>
    </Container>
  )
}

export default Sidebar
