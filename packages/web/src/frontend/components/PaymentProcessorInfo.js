import React from 'react'

import AlertBox from './AlertBox'

const PaymentProcessorInfo = ({ className }) => (
  <AlertBox className={className}>
    We use <a href="https://paddle.com">Paddle.com</a> for processing payments, so transactions may
    appear to be for <strong>"Paddle.com"</strong>.
  </AlertBox>
)

export default PaymentProcessorInfo

