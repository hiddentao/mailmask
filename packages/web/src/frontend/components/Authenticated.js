import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { NOT_LOGGED_IN } from '../../graphql/errorCodes'
import { useSafeQuery } from '../hooks'
import LoadingIcon from './LoadingIcon'
import GetStartedForm from './GetStartedForm'
import ErrorBox from './ErrorBox'
import { GetMyProfileQuery } from '../../graphql/queries'


const LoadingContainer = styled.div`
  ${flex({ justify: 'center' })};
`

const Authenticated = ({ children, no }) => {
  const { data, loading, error } = useSafeQuery(GetMyProfileQuery)

  if (data) {
    return children(data)
  } else if (loading) {
    return <LoadingContainer><LoadingIcon /></LoadingContainer>
  } else if (error) {
    if (error.code === NOT_LOGGED_IN) {
      return no ? no() : (
        <div>
          <p>Please login to view this page!</p>
          <GetStartedForm />
        </div>
      )
    } else {
      return <ErrorBox error={error} />
    }
  }

  return null
}

export default Authenticated


