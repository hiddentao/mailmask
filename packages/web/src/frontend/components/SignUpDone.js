import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import Typing from './Typing'

const Intro = styled.div`
  ${({ theme }) => theme.font('header')};
  font-size: 2rem;

  p {
    display: block;
    margin-bottom: 1rem;
  }
`

const Sub = styled.div`
  ${({ theme }) => theme.font('body')};
  margin: 2rem 0;

  p {
    display: block;
    margin: 1rem 0;

    strong {
      ${({ theme }) => theme.font('body', 'bold')};
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
          We will forward all email received via these masks onto your real email address.
        </p>
        <p>
          You can stop receiving email through a mask at any time by turning it off in
          your dashboard.
        </p>
      </Sub>
    </div>
  )
}

export default SignUpDone


