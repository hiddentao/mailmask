import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import validator from 'validator'

import { useSafeMutation } from '../hooks'
import { RequestLoginLinkMutation } from '../../graphql/mutations'
import Button from './Button'

const Container = styled.div``

const GetStartedForm = ({ className }) => {
  const [ email, setEmail ] = useState('')
  const [ isValid, setIsValid ] = useState(false)
  const [ doRequest, { loading, error } ] = useSafeMutation(RequestLoginLinkMutation)

  const updateEmail = useCallback(({ currentTarget: { value: inputValue } }) => {
    if (inputValue !== email) {
      setEmail(inputValue)
      setIsValid(validator.isEmail(inputValue))
    }
  }, [ email ])

  const submitEmail = useCallback(async () => {
    if (!isValid) {
      return
    }

    await doRequest({
      variables: {
        email,
      }
    })
  }, [ email, isValid, doRequest ])

  return (
    <Container className={className}>
      <p>Enter your email to get started!</p>
      <input type="email" value={email} onChange={updateEmail} />
      <Button disabled={!isValid} onClick={submitEmail}>Go</Button>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>Error: {error.toString()}</div> : null}
    </Container>
  )
}

export default GetStartedForm
