import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import Image from '../../Image'

const Container = styled.div``

const Text = styled.div`
  ${({ theme }) => theme.font('header', 'thin', 'italic')};
  margin: 0 auto;
  width: 600px;
  text-align: center;
  max-width: 90%;
  font-size: 2rem;
  line-height: 1.3em;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    max-width: 70%;
  }

  span {
    &::before {
      content: open-quote;
      margin-right: 0.2em;
    }
    &::after {
      content: close-quote;
      margin-left: 0.2em;
    }
  }
`

const Attribution = styled.div`
  margin-top: 2rem;
`

const Avatar = styled(Image)`
  width: 128px;
  height: 128px;
  border-radius: 128px;
`

const Author = styled.p`
  margin-top: 0.5rem;
`

const TestimonialQuote = ({ className, text, pic, name, website, company }) => {
  return (
    <Container className={className}>
      <Text><span>{text}</span></Text>
      <Attribution>
        {pic ? <Avatar src={pic} /> : null}
        <Author>{name} @ <a href={website}>{company}</a></Author>
      </Attribution>
    </Container>
  )
}

export default TestimonialQuote
