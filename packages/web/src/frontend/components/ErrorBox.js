/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'
import { flex, childAnchors } from 'emotion-styled-utils'

import Icon from './Icon'

const Container = styled.div`
  font-size: 1rem;
`

const ErrorDiv = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start' })};
  background-color: ${({ theme }) => theme.errorBox.bgColor};
  color: ${({ theme }) => theme.errorBox.textColor};
  padding: 0.6em;
  border-radius: 5px;
  margin-top: 0.2rem;

  *:first-of-type {
    margin-top: 0;
  }

  ${({ theme }) => childAnchors(theme.errorBox.anchor)};
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.errorBox.iconColor};
  margin-right: 0.6em;
  font-size: 150%;
`

const Details = styled.div`
  ${({ theme }) => theme.font('body')};
  width: 90%;
  word-break: break-all;
  line-height: 1.2em;
`

const Msg = styled.div`
  font-size: 100%;
  word-break: break-all;
`

const SubMsg = styled.p`
  font-size: 90%;
  margin: 0.5em 0 0 1em;
  word-break: break-all;
`

/**
 * Render an error alert.
 * @return {ReactElement}
 */
const ErrorBox = ({ className, children, error }) => {
  let err

  if (children) {
    err = [ children ]
  } else {
    err = (!Array.isArray(error) ? [ error ] : error)
  }

  return (
    <Container className={className}>
      {err.map(e => (
        <ErrorDiv key={`${e}`}>
          <StyledIcon name='exclamation' />
          <Details>
            <Msg>{e.message || e}</Msg>
            {e.details ? e.details.map(d => (
              <SubMsg key={`${d}`}>- {`${d}`}</SubMsg>
            )) : null}
          </Details>
        </ErrorDiv>
      ))}
    </Container>
  )
}

export default ErrorBox
