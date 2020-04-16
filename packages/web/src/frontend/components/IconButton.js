/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'
import { buttonStyles } from 'emotion-styled-utils'

import Icon from './Icon'


const StyledButton = styled.button`
  ${({ theme, disabled }) => buttonStyles({
    disabled,
    buttonDisabledBgColor: theme.iconButtonDisabledBgColor,
    buttonDisabledTextColor: theme.iconButtonDisabledTextColor,
    buttonDisabledBorderColor: theme.iconButtonDisabledBorderColor,
    buttonBgColor: theme.iconButtonBgColor,
    buttonTextColor: theme.iconButtonTextColor,
    buttonBorderColor: theme.iconButtonBorderColor,
    buttonHoverBgColor: theme.iconButtonHoverBgColor,
    buttonHoverTextColor: theme.iconButtonHoverTextColor,
    buttonHoverBorderColor: theme.iconButtonHoverBorderColor,
    buttonShadowColor: theme.iconButtonShadowColor,
  })}
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  padding: 0.2em 0.6em;
  font-size: 0.9rem;
  border-radius: 1rem;
`

const IconButton = ({ icon, ...props }) => {
  return (
    <StyledButton {...props}>
      <Icon {...icon} />
    </StyledButton>
  )
}

export default IconButton
