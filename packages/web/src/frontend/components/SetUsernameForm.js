import React, { useState, useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import { _, isValidUsername } from '@camomail/utils'

import { withApollo } from '../hoc'
import { useSafeMutation, useSafeQuery } from '../hooks'
import { SetUsernameMutation } from '../../graphql/mutations'
import { GetUsernameAvailabilityQuery } from '../../graphql/queries'
import Button from './Button'
import Icon from './Icon'
import QueryResult from './QueryResult'

const Form = styled.form``

const SetUsernameForm = ({ className }) => {
  const [ username, setUsername ] = useState('')
  const [ isValid, setIsValid ] = useState(false)
  const [ doRequest, result ] = useSafeMutation(SetUsernameMutation)
  const usernameCheckQuery = useSafeQuery(GetUsernameAvailabilityQuery, {
    fetchPolicy: 'network-only',
    // see https://www.apollographql.com/docs/react/data/queries/#inspecting-loading-states
    notifyOnNetworkStatusChange: true,
  })

  const availabilityResult = useMemo(() => _.get(usernameCheckQuery, 'data.result'), [ usernameCheckQuery ])
  const canSubmit = useMemo(() => isValid && _.get(availabilityResult, 'available'), [ isValid, availabilityResult ])

  const updateUsername = useCallback(({ currentTarget: { value: inputValue } }) => {
    if (inputValue !== username) {
      setUsername(inputValue)

      const _valid = isValidUsername(inputValue)

      setIsValid(_valid)

      if (_valid) {
        usernameCheckQuery.refetch({
          username: inputValue,
        })
      }
    }
  }, [ username, usernameCheckQuery ])

  const submitUsername = useCallback(async e => {
    e.preventDefault()

    if (!canSubmit) {
      return
    }

    await doRequest({
      variables: {
        username,
      }
    })
  }, [ username, canSubmit, doRequest ])

  let tickContent
  if (isValid) {
    if (availabilityResult) {
      if (availabilityResult.available) {
        tickContent = <Icon name='check-circle' />
      } else {
        tickContent = <Icon name='times-circle' />
      }
    } else {
      tickContent = <QueryResult {...usernameCheckQuery} />
    }
  }

  return (
    <Form className={className} onSubmit={submitUsername}>
      <p>Please set your username!</p>
      <p>NOTE: once set it cannot be changed, so please choose carefully</p>
      <p>Upto 16 characters, allowable characters: a-z, 0-9, -</p>
      <input type="text" value={username} onChange={updateUsername} />
      {tickContent}
      <Button disabled={!canSubmit} onClick={submitUsername}>Go</Button>
      <QueryResult {...result}>
        {() => <div>Username set!</div>}
      </QueryResult>
    </Form>
  )
}

export default withApollo(SetUsernameForm)
