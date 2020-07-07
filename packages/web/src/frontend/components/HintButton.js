/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'

import IconButton from './IconButton'

const StyledIconButton = styled(IconButton)`
  font-size: 60%;
  padding: 0.1em 0.3em;
`

const HintButton = ({ className, ...props }) => {
  return (
    <StyledIconButton
      className={className}
      icon={{ name: 'question' }}
      {...props}
    />
  )
}

export default HintButton
