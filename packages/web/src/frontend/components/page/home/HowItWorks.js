import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import HowItWorksImage from '../../HowItWorksImage'

const Container = styled.div`
  ${flex({ direction: 'column-reverse', justify: 'center', align: 'center' })};
  text-align: center;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    ${({ isOdd }) => flex({ direction: isOdd ? 'row' : 'row-reverse', justify: 'center', align: 'center' })};
    text-align: initial;
  }
`

const TextBlock = styled.div`
  margin: 0;
  max-width: 300px;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    margin: 0 1rem;
  }
`

const ImageBlock = styled.div`
  margin: 0;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    margin: 0 1rem;
  }
`

const Details = styled.div`
  ${({ theme }) => theme.font('body')};
  font-size: 1rem;
  line-height: 1.3em;
  margin-top: 1rem;
`

const Example = styled.div`
  ${({ theme }) => theme.font('body')};
  padding: 1rem;
  background-color: ${({ theme }) => theme.homePage.howItWorks.example.bgColor};
  color: ${({ theme }) => theme.homePage.howItWorks.example.textColor};
  font-size: 0.9rem;
  line-height: 1.5em;
  margin-top: 1rem;
  border-radius: 5px;
`

const ExamplePrefix = styled.span`
  ${({ theme }) => theme.font('body', 'regular', 'italic')};
  margin-right: 0.5rem;
`

const ExampleDetails = styled.span`
  strong {
    ${({ theme }) => theme.font('body', 'bold')};
  }
`

const HowItWorks = ({ className, number, details, example }) => {
  return (
    <Container className={className} isOdd={number % 2 !== 0}>
      <TextBlock>
        <Details>{details}</Details>
        <Example><ExamplePrefix>Example:</ExamplePrefix><ExampleDetails>{example}</ExampleDetails></Example>
      </TextBlock>
      <ImageBlock>
        <HowItWorksImage stepNum={number} />
      </ImageBlock>
    </Container>
  )
}

export default HowItWorks
