import React from 'react'

import AlertBox from './AlertBox'

const ProcessingPaymentAlert = ({ className }) => (
  <AlertBox className={className}>
    It may take a minute for your payment to be fully processed. Please refresh this page to check the status.
  </AlertBox>
)

export default ProcessingPaymentAlert

