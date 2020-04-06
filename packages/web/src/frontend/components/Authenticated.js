import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import LoadingIcon from './LoadingIcon'
import { useGlobal } from '../hooks'

const LoadingContainer = styled.div`
  ${flex({ justify: 'center' })};
`

const Authenticated = ({ yes, no, check }) => {
  const { me, authenticating } = useGlobal()

  if (me) {
    return yes(me)
  } else if (authenticating) {
    return (check ? check() : <LoadingContainer><LoadingIcon /></LoadingContainer>)
  } else {
    return no()
  }
}

export default Authenticated


