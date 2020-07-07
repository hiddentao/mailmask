/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { renderChildWithArgs } from '../utils/functions'
import LoadingIcon from './LoadingIcon'
import ErrorBox from './ErrorBox'

const Container = styled.div`
  font-size: 1rem;
`

const Loading = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'center' })};
  font-size: inherit;
  color: inherit;

  span {
    ${({ theme }) => theme.font('body', 'regular', 'italic')}
    margin-left: 0.5em;
  }
`

const QueryResult = ({
  className,
  error,
  loading,
  data,
  children,
  hideLoading,
  hideLoadingText,
}) => {
  return (
    <Container className={className}>
      {(loading && !hideLoading) ? (
        <Loading>
          <LoadingIcon />
          {hideLoadingText ? null : <span>Loading...</span>}
        </Loading>
      ) : null}
      {error ? <ErrorBox error={error} /> : null}
      {(!loading && data) ? renderChildWithArgs(children, data) : null}
    </Container>
  )
}

export default QueryResult
