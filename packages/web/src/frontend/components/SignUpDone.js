import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { font } from 'emotion-styled-utils'

import { getAppConfig } from '../appConfig'
import Typing from './Typing'
import NoSsr from './NoSsr'

const { ALIAS_SENDER_EMAIL } = getAppConfig()

const Intro = styled.div`
  ${font('header')};
  font-size: 2rem;

  p {
    display: block;
    margin-bottom: 1rem;
  }
`

const Sub = styled.div`
  ${font('body')};
  margin: 2rem 0;

  p {
    display: block;
    margin: 1rem 0;

    strong {
      ${font('body', 'bold')};
    }
  }
`

const StyledTyping = styled(Typing)`
  margin: 2rem 0;
  font-size: 140%;
`

const SignUpDone = ({ className }) => {
  const router = useRouter()
  const { username } = useMemo(() => router.query, [ router ])

  return (
    <div className={className}>
      <Intro>
        <p>
          You are now signed up!
        </p>
      </Intro>
      <Sub>
        <p>
          From now, whenever you need to provide an email address you can just make one
          up (a "mask") using your username:
        </p>
        <StyledTyping username={username} />
        <p>
          We will forward all email received via these masks onto your real email address - note
          that all forwarded email will appear to come
          from <NoSsr><strong>{ALIAS_SENDER_EMAIL}</strong></NoSsr>.
        </p>
        <p>
          You can stop receiving email through a mask at any time by turning it off in
          the aliases dashboard.
        </p>
      </Sub>
    </div>
  )
}

export default SignUpDone


