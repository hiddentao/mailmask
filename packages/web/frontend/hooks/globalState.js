import { useContext } from 'react'
import { GlobalContext } from '../providers'

/**
 * Hook for obtaining global state.
 *
 * @see {GlobalContext}
 * @return {Object}
 */
export const useGlobalState = () => {
  const value = useContext(GlobalContext)
  return value
}
