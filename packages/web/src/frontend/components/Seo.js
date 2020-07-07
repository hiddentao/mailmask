import React from 'react'
import { NextSeo } from 'next-seo'

import { TAGLINE } from '../constants'

const defaultTitle = `Mailmask - ${TAGLINE}`

const Seo = ({ title, description, publishedTime }) => (
  <NextSeo
    title={title || defaultTitle}
    titleTemplate={title ? '%s | Mailmask' : defaultTitle}
    description={description || `${defaultTitle}. Unlimited, free temporary email addresses, all forwarding to your real email address. Beat spam, protect your privacy.`}
    openGraph={{
      type: 'website',
      locale: 'en_GB',
      site_name: 'Mailmask',
      article: {
        publishedTime: publishedTime ? new Date(publishedTime).toISOString() : '2020-05-31T11:10:51.498Z',
      },
      images: [
        {
          url: 'https://pbs.twimg.com/profile_banners/1275361568511922176/1592904999/1500x500',
          width: 1500,
          height: 500,
          alt: 'Mailmask - easily stop unwanted email',
        },
      ]
    }}
    twitter={{
      handle: '@hiddentao',
      site: '@mskhq',
      cardType: 'summary_large_image',
    }}
  />
)

export default Seo
