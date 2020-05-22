import React, { useMemo, } from 'react'
import DefaultLink from 'next/link'
import url from 'url'

const wrapInAnchor = (children, props) => {
  let gotAnchor = false

  React.Children.forEach(children, c => {
    if (c.type === 'a' || c.__emotion_base === 'a') {
      gotAnchor = true
    }
  })

  return (gotAnchor ? children : <a {...props}>{children}</a>)
}

export const Link = ({ href, as: asHref, query = {}, children, anchorProps }) => {
  const finalHref = useMemo(() => url.format({ pathname: href, query }), [ href, query ])
  const external = useMemo(() => !!href.startsWith('http'), [ href ])

  return (
    <DefaultLink
      href={finalHref}
      {...(asHref ? { as: asHref } : null)}
      {...(external ? { prefetch: false } : null)}
      scroll={true}
    >
      {wrapInAnchor(children, anchorProps)}
    </DefaultLink>
  )
}


export const HomeLink = ({ children, anchorProps }) => (
  <DefaultLink href='/' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const DashboardLink = ({ children, panel = 'main', anchorProps }) => {
  const href = '/dashboard/[panel]'
  const asHref = `/dashboard/${panel}`

  return (
    <DefaultLink href={href} as={asHref} scroll={true}>
      {wrapInAnchor(children, anchorProps)}
    </DefaultLink>
  )
}


export const LoginLink = ({ children, anchorProps }) => (
  <DefaultLink href='/login' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const LogoutLink = ({ children, anchorProps }) => (
  <DefaultLink href='/api/logout' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const PricingLink = ({ children, anchorProps }) => (
  <DefaultLink href='/pricing' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const FaqLink = ({ children, anchorProps }) => (
  <DefaultLink href='/faq' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const HelpLink = ({ children, anchorProps }) => (
  <DefaultLink href='/help' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const AboutLink = ({ children, anchorProps }) => (
  <DefaultLink href='/about' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const TermsLink = ({ children, anchorProps }) => (
  <DefaultLink href='/terms' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)

export const PrivacyLink = ({ children, anchorProps }) => (
  <DefaultLink href='/privacy' scroll={true}>
    {wrapInAnchor(children, anchorProps)}
  </DefaultLink>
)
