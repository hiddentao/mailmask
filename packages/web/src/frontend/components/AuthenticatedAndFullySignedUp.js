import React from 'react'
import { useRouter } from 'next/router'

import { renderChildWithArgs } from '../utils/functions'
import Authenticated from './Authenticated'


const AuthenticatedAndFullySignedUp = ({ children }) => {
  const router = useRouter()

  return (
    <Authenticated>
      {ret => {
        if (ret.signedUp) {
          return renderChildWithArgs(children, ret)
        } else {
          router.replace('/logged-in')
          return null
        }
      }}
    </Authenticated>
  )
}

export default AuthenticatedAndFullySignedUp


