import React from 'react'
import { SUB } from '@mailmask/utils'

const SubStatus = ({ status, classname }) => {
  let content

  switch (status) {
    case SUB.STATUS.CANCELLED:
      content = 'Cancelled'
      break
    case SUB.STATUS.SELECTED:
      content = 'Payment pending'
      break
    case SUB.STATUS.ACTIVE:
      content = 'Active'
      break
    case SUB.STATUS.PAYMENT_FAILED:
      content = 'Payment failed'
      break
    default:
      break
  }

  return <span className={classname}>{content}</span>
}

export default SubStatus
