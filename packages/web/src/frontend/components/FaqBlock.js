import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'

import IconButton from './IconButton'
import Markdown from './Markdown'

const Container = styled.div``

const Heading = styled.p`
  ${font('header')};
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
`

const ItemContainer = styled.div`
  margin-bottom: 3rem;
  overflow: hidden;
`

const StyledIconButton = styled(IconButton)`
  display: block;
  font-size: 0.7rem;
  transform: rotate(${({ expanded }) => (expanded ? '90deg' : '0deg')});
  width: 24px;
  height: 24px;
`

const QuestionText = styled.div`
  flex: 1;
  margin-left: 0.8rem;
`

const Question = styled.p`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'center' })};
  ${font('body', 'bold')};
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1.2em;
  color: ${({ theme }) => theme.faqItem.question.textColor};

  & > span {
    margin-left: 0.5em;
  }
`

const Answer = styled.div`
  ${font('body')};
  color: ${({ theme }) => theme.faqItem.answer.textColor};
  font-size: 1rem;
  line-height: 1.2em;
  margin-top: ${({ expanded }) => (expanded ? '1rem' : '0')};
  max-height: ${({ expanded }) => (expanded ? 'auto' : '0')};
`


const FaqItem = ({ initiallyExpanded, question, answer }) => {
  const [ expanded, setExpanded ] = useState(initiallyExpanded)

  const toggle = useCallback(() => {
    setExpanded(!expanded)
  }, [ expanded ])

  return (
    <ItemContainer>
      <Question onClick={toggle}>
        <StyledIconButton icon={{ name: 'chevron-right' }} expanded={expanded} />
        <QuestionText>{question}</QuestionText>
      </Question>
      <Answer expanded={expanded}>
        <Markdown>{answer}</Markdown>
      </Answer>
    </ItemContainer>
  )
}

const FaqColumn = ({ heading, initiallyExpanded, data, className }) => {
  return (
    <Container className={className}>
      {heading ? <Heading>{heading}</Heading> : null}
      {data.map(([ question, answer ]) => (
        <FaqItem key={question} question={question} answer={answer} initiallyExpanded={initiallyExpanded} />
      ))}
    </Container>
  )
}

export default FaqColumn
