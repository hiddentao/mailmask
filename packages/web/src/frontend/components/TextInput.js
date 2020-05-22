/* eslint-disable-next-line import/no-extraneous-dependencies */
import React, { forwardRef, useCallback } from 'react'
import styled from '@emotion/styled'
import { font } from 'emotion-styled-utils'

const Input = styled.input`
  ${font('body')};
  display: block;
  width: 100%;
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.input.errorBorderColor : theme.input.borderColor)};
  background-color: ${({ theme, hasError }) => (hasError ? theme.input.errorBgColor : theme.input.bgColor)};
  color: ${({ theme }) => theme.input.textColor};
  padding: 1em;
  font-size: 1rem;
  outline: none;
  border-radius: 5px;

  &::placeholder {
    ${font('body', 'regular', 'italic')};
    color: ${({ theme }) => theme.input.placeholderTextColor};
    font-size: 90%;
  }
 `

/**
 * Render a text input field.
 * @return {ReactElement}
 */
const TextInput = forwardRef((props, ref) => {
  const {
    onChange,
    error,
    ...otherProps
  } = props

  const onTextChange = useCallback(({ currentTarget: { value: inputValue } }) => {
    onChange(inputValue)
  }, [ onChange ])

  return (
    <Input
      ref={ref}
      type='text'
      onChange={onTextChange}
      hasError={!!error}
      {...otherProps}
    />
  )
})

export default TextInput
