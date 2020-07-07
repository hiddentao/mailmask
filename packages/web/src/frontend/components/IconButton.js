/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'
import { buttonStyles } from 'emotion-styled-utils'

import Icon from './Icon'
import Tooltip from './Tooltip'

const StyledButton = styled.button`
  ${({ theme, disabled }) => buttonStyles({
    ...theme.iconButton,
    inDisabledMode: disabled
  })};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  padding: 0.2em 0.6em;
  font-size: 0.9rem;
  border-radius: 1rem;
`

const IconButton = ({ icon, tooltip, ...props }) => {
  return (
    <Tooltip content={tooltip}>
      {({ tooltipElement, show, hide }) => (
        <StyledButton
          {...props}
          onMouseOver={show}
          onMouseOut={hide}
        >
          <Icon {...icon} />
          {tooltipElement}
        </StyledButton>
      )}
    </Tooltip>
  )
}

export default IconButton
