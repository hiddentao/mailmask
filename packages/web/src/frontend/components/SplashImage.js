import React, { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import TinyCrossFade from 'react-tiny-crossfade'
import { ClassNames } from '@emotion/core'

import SvgImage from './SvgImage'

const baseStyles = `
  width: 387px;
  height: 365px;
`

const StyledTinyCrossFade = styled(TinyCrossFade)`
  ${baseStyles};
`

const Container = styled.div`
  ${baseStyles};
`

const SplashSvg = ({ className }) => {
  const [ active, setActive ] = useState(1)

  useEffect(() => {
    let show = 1

    const timer = setInterval(() => {
      show = (show < 3 ? show + 1 : 1)
      setActive(show)
    }, 6000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const content = useMemo(() => {
    return <Container key={active}><SvgImage src={`splash${active}`} /></Container>
  }, [ active ])

  return (
    <ClassNames>
      {({ css }) => (
        <StyledTinyCrossFade
          className={className}
          classNames={{
            beforeEnter: css`
              opacity: 0;
            `,
            entering: css`
              opacity: 1;
              transition: opacity 0.5s;
            `,
            beforeLeave: css`
              opacity: 1;
            `,
            leaving: css`
              opacity: 0;
              transition: opacity 0.5s;
            `,
          }}
          disableInitialAnimation={true}
        >
          {content}
        </StyledTinyCrossFade>
      )}
    </ClassNames>
  )
}

export default SplashSvg
