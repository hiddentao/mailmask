import React from 'react'
import { NextSeo } from 'next-seo'

import { getAppConfig } from '../appConfig'

const { DOMAIN } = getAppConfig()

const defaultTitle = 'Mailmask - Unlimited, free disposable email addresses'

const Seo = ({ title }) => (
  <NextSeo
    title={title || defaultTitle}
    titleTemplate={title ? '%s | Mailmask' : defaultTitle}
    description={`${defaultTitle}, all forwarding to your real email address. Beat spam, protect your privacy.`}
    openGraph={{
      type: 'website',
      locale: 'en_GB',
      url: `https://${DOMAIN}/`,
      site_name: 'Mailmask',
    }}
  />
)

export default Seo
