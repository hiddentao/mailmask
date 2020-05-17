import React from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

import Icon from './Icon'

const Container = styled.div`
  font-size: 1rem;
`

const Div = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start' })};
  background-color: ${({ theme }) => theme.alertBoxBgColor};
  color: ${({ theme }) => theme.alertBoxTextColor};
  padding: 0.6em;
  border-radius: 5px;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.alertBoxIconColor};
  margin-right: 0.6em;
  font-size: 150%;
`

const Details = styled.div`
  ${font('body')};
  width: 90%;
  line-height: 1.4em;
`

const Msg = styled.div`
  font-size: 100%;

  strong {
    ${font('body', 'bold')};
  }
`

/**
 * Render an alert.
 * @return {ReactElement}
 */
const AlertBox = ({ className, children }) => {
  return (
    <Container className={className}>
      <Div>
        <StyledIcon name='info' />
        <Details>
          <Msg>{children}</Msg>
        </Details>
      </Div>
    </Container>
  )
}

export default AlertBox
