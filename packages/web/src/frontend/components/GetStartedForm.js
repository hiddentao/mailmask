import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'

import Button from './Button'

const Container = styled.div``

const GetStartedForm = ({ className }) => {
  const [ email, setEmail ] = useState('')

  const updateEmail = useCallback(({ currentTarget: { value: inputValue } }) => {
    if (inputValue !== email) {
      setEmail(inputValue)
    }
  }, [ email ])

  const submitEmail = useCallback(() => {
    window.alert(email)
  }, [ email ])

  return (
    <Container className={className}>
      <p>Enter your email to get started!</p>
      <input type="email" value={email} onChange={updateEmail} />
      <Button onClick={submitEmail}>Go</Button>
    </Container>
  )
}

export default GetStartedForm
