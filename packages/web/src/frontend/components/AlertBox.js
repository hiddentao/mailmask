import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import Icon from './Icon'

const Container = styled.div`
  font-size: 1rem;
`

const Div = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start' })};
  background-color: ${({ theme }) => theme.alertBox.bgColor};
  color: ${({ theme }) => theme.alertBox.textColor};
  padding: 0.6em;
  border-radius: 5px;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.alertBox.iconColor};
  margin-right: 0.6em;
  font-size: 150%;
`

const Details = styled.div`
  ${({ theme }) => theme.font('body')};
  width: 90%;
  line-height: 1.4em;
`

const Msg = styled.div`
  font-size: 100%;

  strong {
    ${({ theme }) => theme.font('body', 'bold')};
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
