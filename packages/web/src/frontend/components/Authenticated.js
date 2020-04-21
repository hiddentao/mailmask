import LogRocket from 'logrocket'
import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { _ } from '@mailmask/utils'

import { withApollo } from '../hoc'
import { renderChildWithArgs } from '../utils/functions'
import { NOT_LOGGED_IN } from '../../graphql/errorCodes'
import { useSafeQuery } from '../hooks'
import LoadingIcon from './LoadingIcon'
import GetStartedForm from './GetStartedForm'
import ErrorBox from './ErrorBox'
import { GetMyProfileQuery } from '../../graphql/queries'


const LoadingContainer = styled.div`
  ${flex({ justify: 'center' })};
`

const PleaseLogin = styled.div`
  p {
    margin-bottom: 1rem;
  }
`

const Authenticated = ({
  children,
  renderNotAuthenticated,
  renderError,
}) => {
  const { data, loading, error } = useSafeQuery(GetMyProfileQuery)

  if (loading) {
    return <LoadingContainer><LoadingIcon /></LoadingContainer>
  } else if (error) {
    if (error.code === NOT_LOGGED_IN) {
      return renderNotAuthenticated ? renderChildWithArgs(renderNotAuthenticated) : (
        <PleaseLogin>
          <p>Please login to view this page!</p>
          <GetStartedForm />
        </PleaseLogin>
      )
    } else {
      return (
        renderError
          ? renderChildWithArgs(renderError, error)
          : <ErrorBox error={error} />
      )
    }
  } else {
    const uid = _.get(data, 'result.id')

    if (uid) {
      LogRocket.identify(uid)
    }

    return renderChildWithArgs(children, data.result)
  }
}

export default withApollo(Authenticated)


