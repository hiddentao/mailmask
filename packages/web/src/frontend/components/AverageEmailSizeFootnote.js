import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  ${({ theme }) => theme.font('body', 'thin')};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.footnote.textColor};
`

const AverageEmailSizeFootnote = ({ className }) => (
  <Container className={className}>
    * average email size is 59 KB <a href="http://answers.google.com/answers/threadview?id=312463">(source)</a>
  </Container>
)

export default AverageEmailSizeFootnote
