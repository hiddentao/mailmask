import React from 'react'

import { getInitialPageProps } from '../frontend/utils/pageProps'
import Layout from '../frontend/components/Layout'

const HomePage = () => {
  return (
    <Layout>
      Hello world!
    </Layout>
  )
}

HomePage.getInitialProps = getInitialPageProps

export default HomePage


