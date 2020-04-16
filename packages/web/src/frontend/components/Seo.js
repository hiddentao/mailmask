import React from 'react'
import { NextSeo } from 'next-seo'

const Seo = ({ title }) => (
  <NextSeo
    title={title || 'MailMask'}
    titleTemplate='%s | MailMask'
    description='Beat spam. Protect your privacy. Create virtual addresses that mask your real email address.'
    openGraph={{
      type: 'website',
      locale: 'en_GB',
      url: 'https://msk.sh/',
      site_name: 'MailMask',
    }}
  />
)

export default Seo
