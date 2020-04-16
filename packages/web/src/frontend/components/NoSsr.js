// From https://stackoverflow.com/a/57173209/207619
import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

const NoSsr = ({ children }) => (
  <Fragment>{children}</Fragment>
)

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})
