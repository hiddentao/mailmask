import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { _, isValidEmail } from '@mailmask/utils'
import { flex } from 'emotion-styled-utils'
import { useRouter } from 'next/router'

import { withApollo } from '../hoc'
import { useSafeMutation } from '../hooks'
import { RequestLoginLinkMutation } from '../../graphql/mutations'
import Button from './Button'
import QueryResult from './QueryResult'
import TextInput from './TextInput'

const Container = styled.div`
  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    max-width: 500px;
  }
`

const Form = styled.form`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};
  margin-bottom: 0.5rem;
`

const SubmitButton = styled(Button)`
  margin-left: 0.5rem;
`

const GetStartedForm = ({ className }) => {
  const router = useRouter()
  const [ email, setEmail ] = useState('')
  const [ isValid, setIsValid ] = useState(false)
  const [ doRequest, result ] = useSafeMutation(RequestLoginLinkMutation)

  const updateEmail = useCallback(newEmail => {
    if (newEmail !== email) {
      setEmail(newEmail)
      setIsValid(isValidEmail(newEmail))
    }
  }, [ email ])

  const submitEmail = useCallback(async e => {
    e.preventDefault()

    if (!isValid) {
      return
    }

    const ret = await doRequest({
      variables: {
        email,
      }
    })

    if (_.get(ret, 'data.result.success')) {
      router.replace('/await-email')
    }
  }, [ email, isValid, doRequest, router ])

  return (
    <Container className={className}>
      <Form onSubmit={submitEmail}>
        <TextInput
          type="email"
          value={email}
          onChange={updateEmail}
          placeholder='Enter email address...'
        />
        <SubmitButton
          loading={result.loading}
          disabled={!isValid}
          onClick={submitEmail}
        >
          Start
        </SubmitButton>
      </Form>
      <QueryResult {...result} hideLoading={true} />
    </Container>
  )
}

export default withApollo(GetStartedForm)
