import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 100%;
  max-width: ${({ width }) => width || '100%'};
  margin: 0 auto;
`

/**
 * Render a max-width container.
 * @return {ReactElement}
 */
const MaxContentWidth = ({ children, width }) => (
  <Container width={width}>
    {children}
  </Container>
)

export default MaxContentWidth
