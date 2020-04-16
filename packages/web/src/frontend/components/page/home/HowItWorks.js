import React from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  text-align: center;
`

const Number = styled.div`
  ${font('header')}
  font-size: 2rem;
  width: 60px;
  line-height: 60px;
  border: 1px solid ${({ theme }) => theme.homePageHowItWorksNumberBorderColor};
  border-radius: 50%;
`

const Details = styled.div`
  ${font('body')};
  width: 70%;
  font-size: 1.2rem;
  line-height: 1.2em;
  margin-top: 1rem;
`

const Example = styled.div`
  ${font('body')};
  width: 70%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.homePageHowItWorksExampleBgColor};
  color: ${({ theme }) => theme.homePageHowItWorksExampleTextColor};
  font-size: 1rem;
  line-height: 1.5em;
  margin-top: 1rem;
  border-radius: 5px;

  strong {
    ${font('body', 'bold')};
    margin-right: 0.5rem;
  }
`

const HowItWorks = ({ className, number, details, example }) => {
  return (
    <Container className={className}>
      <Number>{number}</Number>
      <Details>{details}</Details>
      <Example><strong>Example:</strong>{example}</Example>
    </Container>
  )
}

export default HowItWorks
