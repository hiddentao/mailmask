import React, { useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { _ } from '@mailmask/utils'
import { flex } from 'emotion-styled-utils'

import { getAppConfig } from '../src/frontend/appConfig'
import { withApollo } from '../src/frontend/hoc'
import { useSafeMutation } from '../src/frontend/hooks'
import { VerifyCodeMutation } from '../src/graphql/mutations'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import QueryResult from '../src/frontend/components/QueryResult'
import Seo from '../src/frontend/components/Seo'
import NoSsr from '../src/frontend/components/NoSsr'
import TextInput from '../src/frontend/components/TextInput'
import Button from '../src/frontend/components/Button'

const { SUPPORT_EMAIL } = getAppConfig()

const Intro = styled.div`
  ${({ theme }) => theme.font('header')};
  font-size: 1.7rem;

  p {
    display: block;
    margin-bottom: 2rem;
  }
`

const Sub = styled.div`
  ${({ theme }) => theme.font('body')};
  margin-top: 2rem;

  strong {
    ${({ theme }) => theme.font('body', 'bold')};
  }
`

const Form = styled.form`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};
  margin-bottom: 0.5rem;

  ${({ theme }) => theme.media.when({ minW: 'mobile' })} {
    max-width: 400px;
  }
`

const SubmitButton = styled(Button)`
  margin-left: 0.5rem;
`

const StyledTextInput = styled(TextInput)`
`

const AwaitEmailPage = () => {
  const router = useRouter()
  const { token } = useMemo(() => router.query, [ router ])

  const [ code, setCode ] = useState('')
  const [ doRequest, result ] = useSafeMutation(VerifyCodeMutation)

  const verifyCode = useCallback(async e => {
    e.preventDefault()

    const ret = await doRequest({
      variables: {
        verifyCodeRequest: {
          token,
          code,
        }
      }
    })

    if (_.get(ret, 'data.result.success')) {
      router.replace({
        pathname: `/logged-in`,
      })
    }
  }, [ doRequest, token, code, router ])

  return (
    <Layout>
      <Seo title='Await email' />
      <ContentWrapper>
        <Intro>
          <p>
            We have sent a verification code to the email address you provided.
          </p>
          <p>
            Please enter it below:
          </p>
          <div>
            <Form onSubmit={verifyCode}>
              <StyledTextInput
                type="text"
                value={code}
                onChange={setCode}
                placeholder='Verification code...'
              />
              <SubmitButton
                loading={result.loading}
                onClick={verifyCode}
              >
                Verify
              </SubmitButton>
          </Form>
            <QueryResult {...result} hideLoading={true} />
          </div>
        </Intro>
        <Sub>
          Note: You may need to check your spam folder for an email
          from <NoSsr><strong>{SUPPORT_EMAIL}</strong></NoSsr>.
        </Sub>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(AwaitEmailPage)

