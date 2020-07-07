import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import Image from './Image'

const baseStyles = `
  width: 275px;
  height: 300px;
`

const Container = styled.div`
  ${baseStyles};
`

const HowItWorksImage = ({ className, stepNum }) => {
  const content = useMemo(() => {
    return <Image src={`howItWorks${stepNum}`} />
  }, [ stepNum ])

  return <Container className={className}>{content}</Container>
}

export default HowItWorksImage
