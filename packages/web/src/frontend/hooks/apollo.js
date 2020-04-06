import { useApolloClient } from '@apollo/react-hooks'

/*
On server-side useApolloClient() doesn't work properly
 */
export const useIsmorphicApolloClient = typeof window !== 'undefined' ? useApolloClient : () => null
