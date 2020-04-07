/* eslint-disable-next-line import/no-extraneous-dependencies */
import React from 'react'
import styled from '@emotion/styled'

import LoadingIcon from './LoadingIcon'
import ErrorBox from './ErrorBox'

const Container = styled.div`
  font-size: 1rem;
`

const QueryResult = ({ className, error, loading, data, children }) => {
  return (
    <Container className={className}>
      {loading ? <LoadingIcon /> : null}
      {error ? <ErrorBox error={error} /> : null}
      { /* eslint-disable-next-line no-nested-ternary */ }
      {data ? ((typeof children === 'function') ? children(data) : children) : null}
    </Container>
  )
}

export default QueryResult
