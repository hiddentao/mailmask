import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import { buttonStyles, font } from 'emotion-styled-utils'

import LoadingIcon from './LoadingIcon'

const StyledButton = styled.button`
  ${font('body', 'bold')};
  font-size: 1rem;
  padding: 1em 2em;
  white-space: nowrap;
  border-radius: 5px;

  ${({ theme, disabled }) => buttonStyles({
    ...theme.button,
    inDisabledState: disabled,
  })};
`

const StyledLoadingIcon = styled(LoadingIcon)`
  color: ${({ theme }) => theme.buttonTextColor};
`

/**
 * Render a button.
 * @return {ReactElement}
 */
const Button = forwardRef(({ loading, children, onClick, ...props }, ref) => (
  <StyledButton {...props} onClick={loading ? null : onClick} ref={ref}>
    {loading ? (
      <StyledLoadingIcon />
    ) : (
        children
      )}
  </StyledButton>
))

export default Button




