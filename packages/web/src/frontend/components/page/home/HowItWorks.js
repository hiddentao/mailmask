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
  border: 1px solid ${({ theme }) => theme.homePage.howItWorks.number.borderColor};
  border-radius: 50%;
`

const Details = styled.div`
  ${font('body')};
  font-size: 1.2rem;
  line-height: 1.2em;
  margin-top: 1rem;
`

const Example = styled.div`
  ${font('body')};
  padding: 1rem;
  background-color: ${({ theme }) => theme.homePage.howItWorks.example.bgColor};
  color: ${({ theme }) => theme.homePage.howItWorks.example.textColor};
  font-size: 1rem;
  line-height: 1.5em;
  margin-top: 1rem;
  border-radius: 5px;
`

const ExamplePrefix = styled.span`
  ${font('body', 'normal', 'italic')};
  margin-right: 0.5rem;
`

const ExampleDetails = styled.span`
  strong {
    ${font('body', 'bold')};
  }
`

const HowItWorks = ({ className, number, details, example }) => {
  return (
    <Container className={className}>
      <Number>{number}</Number>
      <Details>{details}</Details>
      <Example><ExamplePrefix>Example:</ExamplePrefix><ExampleDetails>{example}</ExampleDetails></Example>
    </Container>
  )
}

export default HowItWorks
