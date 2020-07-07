import { useCallback, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'

import { constructUserFriendlyError, resolveError } from '../../graphql/errors'

export const useSafeMutation = (mutation, opts) => {
  const client = useApolloClient()
  const [ result, setResult ] = useState({})

  const fn = useCallback(async args => {
    setResult({
      loading: true
    })

    let ret
    let error

    try {
      ret = await client.mutate({
        mutation,
        ...opts,
        ...args
      })
    } catch (err) {
      error = err
    }

    if (!error) {
      error = resolveError(ret)
    }

    if (error) {
      ret = {
        error: constructUserFriendlyError(error),
      }
    }

    setResult(ret)

    return ret
  }, [ mutation, opts, client ])

  return [ fn, result ]
}


export const useSafeQuery = (query, opts) => {
  const { loading, error, data, ...props } = useQuery(query, {
    fetchPolicy: 'cache-and-network',
    ...opts,
  })

  if ((data || error) && !loading) {
    const resolvedError = resolveError({ error, data })

    if (resolvedError) {
      return { error: constructUserFriendlyError(resolvedError), ...props }
    }
  }

  return { loading, data, ...props }
}

