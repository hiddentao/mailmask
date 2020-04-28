import React from 'react'
import { NextSeo } from 'next-seo'

import { getAppConfig } from '../appConfig'

const { DOMAIN } = getAppConfig()

const Seo = ({ title }) => (
  <NextSeo
    title={title || 'Mailmask'}
    titleTemplate='%s | Mailmask'
    description='Beat spam. Protect your privacy. Create virtual addresses that mask your real email address.'
    openGraph={{
      type: 'website',
      locale: 'en_GB',
      url: `https://${DOMAIN}/`,
      site_name: 'Mailmask',
    }}
  />
)

export default Seo
