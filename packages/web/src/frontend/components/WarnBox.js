import React from 'react'
import styled from '@emotion/styled'

import AlertBox from './AlertBox'

const StyledAlertBox = styled(AlertBox)`
  & > div {
    background-color: ${({ theme }) => theme.warnBox.bgColor};
    color: ${({ theme }) => theme.warnBox.textColor};

    & > svg {
      color: ${({ theme }) => theme.warnBox.iconColor};
    }
  }
`


const WarnBox = props => {
  return (
    <StyledAlertBox {...props} icon='exclamation-triangle' />
  )
}

export default WarnBox
