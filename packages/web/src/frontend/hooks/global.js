import { useContext } from 'react'
import { GlobalContext } from '../contexts'

export const useGlobal = () => {
  return useContext(GlobalContext)
}
