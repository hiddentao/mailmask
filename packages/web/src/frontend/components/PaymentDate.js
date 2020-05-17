import React from 'react'
import { formatDate } from '@mailmask/utils'

const PaymentDate = ({ children }) => (
  <span>
    {formatDate(new Date(children), 'MMM do, yyyy')}
  </span>
)

export default PaymentDate
