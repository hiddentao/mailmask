import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex, font } from 'emotion-styled-utils'
import Typing from 'react-typing-animation'

const Container = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'center', wrap: 'no-wrap', basis: 0 })};
  & > div {
    margin: 0 0.1em;
  }
`
const TypingPrefix = styled(Typing)``
const At = styled.div`
  font-size: 80%;
`
const User = styled.div`
  ${font('body', 'normal', 'italic')};
`
const Suffix = styled.div`
  em {
    ${font('body', 'bold')}
    padding: 0 0.2em 0 0.2em;
    &:first-child {
      padding-left: 0;
    }
  }
`

const TypingCursor = styled(Typing.Cursor)`
  color: ${({ theme }) => theme.homePageTopBlockTextColor};
`

const TYPING_PREFIXES = [
  'trial',
  'nytimes',
  'xbox',
  'discord',
  'github',
  'facebook',
  'instagram',
  'tinder',
  'ifttt',
  'temporary',
]

const TypingComponent = ({ className, username }) => {
  const [ typingPrefixIndex, setTypingPrefixIndex ] = useState(0)

  const showNextTypingPrefix = useCallback(() => {
    setTimeout(() => {
      setTypingPrefixIndex(
        (TYPING_PREFIXES.length - 1) === typingPrefixIndex ? 0 : typingPrefixIndex + 1
      )
    }, 1000)
  }, [ typingPrefixIndex ])

  return (
    <Container className={className}>
      <TypingPrefix
        key={typingPrefixIndex}
        speed={50}
        cursor={<TypingCursor />}
        onFinishedTyping={showNextTypingPrefix}
      >
        {TYPING_PREFIXES[typingPrefixIndex]}
      </TypingPrefix>
      <At>@</At>
      <User>{username}</User>
      <Suffix><em>.</em>msk<em>.</em>sh</Suffix>
    </Container>
  )
}

export default TypingComponent


