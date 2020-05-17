import React from 'react'
import { SUB, LEGAL } from '@mailmask/utils'
import { useRouter } from 'next/router'

import { renderChildWithArgs } from '../utils/functions'
import Authenticated from './Authenticated'


const AuthenticatedAndFullySignedUp = ({ children }) => {
  const router = useRouter()

  return (
    <Authenticated>
      {ret => {
        const termsAgreed = ret.legal.find(({ type }) => type === LEGAL.TERMS_AND_CONDITIONS)

        if (termsAgreed) {
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


