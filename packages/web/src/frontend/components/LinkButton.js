/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'
import { buttonStyles } from 'emotion-styled-utils'


const StyledButton = styled.button`
  ${({ theme, disabled }) => buttonStyles({
    disabled,
    buttonDisabledBgColor: theme.linkButtonDisabledBgColor,
    buttonDisabledTextColor: theme.linkButtonDisabledTextColor,
    buttonDisabledBorderColor: theme.linkButtonDisabledBorderColor,
    buttonBgColor: theme.linkButtonBgColor,
    buttonTextColor: theme.linkButtonTextColor,
    buttonBorderColor: theme.linkButtonBorderColor,
    buttonHoverBgColor: theme.linkButtonHoverBgColor,
    buttonHoverTextColor: theme.linkButtonHoverTextColor,
    buttonHoverBorderColor: theme.linkButtonHoverBorderColor,
    buttonShadowColor: theme.linkButtonShadowColor,
  })}
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  padding: 0.2em 0.6em;
  font-size: 0.9rem;
  text-decoration: underline;
`

const LinkButton = ({ ...props }) => {
  return (
    <StyledButton {...props} />
  )
}

export default LinkButton
