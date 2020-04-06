import { useCallback, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'

import { stringifyError, resolveError } from '../../graphql/errors'

export const useSafeMutation = mutation => {
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
        ...args
      })
    } catch (err) {
      error = err
    }

    if (!error) {
      error = resolveError(ret)
    }

    if (error) {
      const e = new Error(stringifyError(error))

      e.code = error.code

      setResult({
        error: e,
      })
    } else {
      setResult(ret)
    }
  }, [ mutation, client ])

  return [ fn, result ]
}

export const useSafeQuery = query => {
  const { loading, error, data } = useQuery(query)

  if ((data || error) && !loading) {
    const resolvedError = resolveError({ error, data })

    if (resolvedError) {
      const e = new Error(stringifyError(resolvedError))
      e.code = resolvedError.code
      return { error: resolvedError }
    }
  }

  return { loading, data }
}

