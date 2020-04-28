import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import styled from '@emotion/styled'
import { _, isValidUsername } from '@mailmask/utils'
import { font, flex } from 'emotion-styled-utils'

import { withApollo } from '../hoc'
import { useSafeMutation } from '../hooks'
import { CompleteSignupMutation } from '../../graphql/mutations'
import { resolveError } from '../../graphql/errors'
import { GetUsernameAvailabilityQuery } from '../../graphql/queries'
import Button from './Button'
import LoadingIcon from './LoadingIcon'
import AlertBox from './AlertBox'
import TextInput from './TextInput'
import Icon from './Icon'
import QueryResult from './QueryResult'
import { TermsLink, PrivacyLink } from './Link'

const Form = styled.form`
  margin-bottom: 2rem;
  width: 90%;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    max-width: 400px;
  }
`

const InstructionsBox = styled(AlertBox)`
  margin: 1rem 0;

  p {
    margin: 1rem 0;
  }

  strong {
    ${font('body', 'bold')}
  }
`

const TickContainer = styled.div`
  margin: 0.3rem 0 2rem;
  ${flex({ direction: 'row', justify: 'flex-start', align: 'center' })};
`

const YesTick = styled.span`
  color: ${({ theme }) => theme.setUsernameYesTickColor};
`

const NoTick = styled.span`
  color: ${({ theme }) => theme.setUsernameNoTickColor};
`

const LegalContainer = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'center' })};
  margin: 2rem 0 3rem;

  input, label {
    display: block;
  }

  input {
    margin-right: 1rem;
  }
`


let usernameCheckTimer

const SetUsernameForm = ({ className }) => {
  const apolloClient = useApolloClient()
  const router = useRouter()
  const [ termsAgreed, setTermsAgreed ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ isValid, setIsValid ] = useState(false)
  const [ isAvailable, setIsAvailable ] = useState(false)
  const [ checkingUsername, setCheckingUsername ] = useState(false)
  const [ doRequest, result ] = useSafeMutation(CompleteSignupMutation)

  const canSubmit = useMemo(() => isValid && isAvailable && termsAgreed, [ isValid, isAvailable, termsAgreed ])

  const toggleTermsAgreed = useCallback(() => {
    setTermsAgreed(!termsAgreed)
  }, [ termsAgreed ])

  const updateUsername = useCallback(newUsername => {
    if (newUsername !== username) {
      setUsername(newUsername)
      setIsValid(false)

      // wait 250ms for user to finish typing before checking
      clearTimeout(usernameCheckTimer)
      usernameCheckTimer = setTimeout(async () => {
        const _valid = isValidUsername(newUsername)
        setIsValid(_valid)

        if (_valid) {
          setCheckingUsername(true)

          try {
            const ret = await apolloClient.query({
              query: GetUsernameAvailabilityQuery,
              variables: {
                username: newUsername,
              },
              fetchPolicy: 'network-only',
            })

            const error = resolveError(ret)

            if (error) {
              throw error
            }

            setIsAvailable(_.get(ret, 'data.result.available'))
          } catch (err) {
            setIsAvailable(false)
          }

          setCheckingUsername(false)
        }
      }, 250)
    }
  }, [ username, apolloClient ])

  const completeSignUp = useCallback(async e => {
    e.preventDefault()

    if (!canSubmit) {
      return
    }

    const ret = await doRequest({
      variables: {
        signUp: {
          username,
        }
      }
    })

    if (_.get(ret, 'data.result.success')) {
      router.replace(`/sign-up-done?username=${username}`)
    }
  }, [ router, username, canSubmit, doRequest ])

  let tickContent
  if (isValid) {
    if (checkingUsername) {
      tickContent = <LoadingIcon />
    } else {
      if (isAvailable) {
        tickContent = (
          <YesTick>
            <Icon name='check-circle' /> Available
          </YesTick>
        )
      } else {
        tickContent = (
          <NoTick>
            <Icon name='times-circle' /> Already taken
          </NoTick>
        )
      }
    }
  }

  return (
    <Form className={className} onSubmit={completeSignUp}>
      <InstructionsBox>
        <p>Your username must be between 3 and 16 characters in length and must
        only contain letters (A-Z), numbers (0-9) and hyphens (-).</p>
        <p>
          <strong>Once set it cannot be changed, so please choose carefully!</strong>
        </p>
      </InstructionsBox>

      <TextInput
        size="20"
        type="text"
        value={username}
        onChange={updateUsername}
      />
      <TickContainer>
        {tickContent}
      </TickContainer>

      <LegalContainer>
        <input type="checkbox" selected={termsAgreed} onClick={toggleTermsAgreed} />
        <label>
          I have read the <TermsLink>terms and conditions</TermsLink> and <PrivacyLink>privacy policy</PrivacyLink>.
        </label>
      </LegalContainer>

      <Button
        type="submit"
        disabled={!canSubmit}
        loading={_.get(result, 'loading')}
        onClick={completeSignUp}
      >
        Continue
      </Button>
      <QueryResult {...result} hideLoading={true} />
    </Form>
  )
}

export default withApollo(SetUsernameForm)
