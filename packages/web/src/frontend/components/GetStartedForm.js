import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { isValidEmail } from '@camomail/utils'

import { withApollo } from '../hoc'
import { useSafeMutation } from '../hooks'
import { RequestLoginLinkMutation } from '../../graphql/mutations'
import Button from './Button'
import QueryResult from './QueryResult'

const Form = styled.form``

const GetStartedForm = ({ className }) => {
  const [ email, setEmail ] = useState('')
  const [ isValid, setIsValid ] = useState(false)
  const [ doRequest, result ] = useSafeMutation(RequestLoginLinkMutation)

  const updateEmail = useCallback(({ currentTarget: { value: inputValue } }) => {
    if (inputValue !== email) {
      setEmail(inputValue)
      setIsValid(isValidEmail(inputValue))
    }
  }, [ email ])

  const submitEmail = useCallback(async e => {
    e.preventDefault()

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
    <Form className={className} onSubmit={submitEmail}>
      <p>Enter your email to get started!</p>
      <input type="email" value={email} onChange={updateEmail} />
      <Button disabled={!isValid} onClick={submitEmail}>Go</Button>
      <QueryResult {...result}>
        <div>Email sent!</div>
      </QueryResult>
    </Form>
  )
}

export default withApollo(GetStartedForm)
