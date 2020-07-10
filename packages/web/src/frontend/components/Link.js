import React, { useMemo, } from 'react'
import DefaultLink from 'next/link'
import url from 'url'

import {
  GITHUB_URL,
  TWITTER_URL,
  SELF_HOSTING_GUIDE_URL,
} from '../constants'

const wrapInAnchor = (children, props) => {
  let gotAnchor = false

  React.Children.forEach(children, c => {
    if (c.type === 'a' || c.__emotion_base === 'a') {
      gotAnchor = true
    }
  })

  return (gotAnchor ? children : <a {...props}>{children}</a>)
}

export const Link = ({ href, as: asHref, query = {}, children, title, scroll }) => {
  const isExternal = useMemo(() => href.startsWith('http'), [ href ])
  const isApiRoute = useMemo(() => href.startsWith('/api'), [ href ])

  const finalHref = useMemo(() => (
    (isApiRoute || isExternal || href.includes('#')) ? href : url.format({ pathname: href, query })
  ), [ isApiRoute, isExternal, href, query ])

  const content = useMemo(() => wrapInAnchor(
    children,
    (isApiRoute || isExternal) ? { title, href: finalHref } : { title }
  ), [ isExternal, isApiRoute, finalHref, children, title ])

  if (isExternal) {
    return content
  }

  return (
    <DefaultLink
      href={finalHref}
      {...(asHref ? { as: asHref } : null)}
      scroll={scroll}
    >
      {content}
    </DefaultLink>
  )
}

const NamedLink = ({ noScroll, ...props }) => (
  <Link scroll={!noScroll} {...props} />
)


export const DashboardLink = ({ panel = 'main', ...props }) => {
  const href = panel === 'main' ? '/dashboard' : '/dashboard/[panel]'
  const asHref = panel === 'main' ? '/dashboard' : `/dashboard/${panel}`

  return <NamedLink href={href} as={asHref} {...props} />
}

export const HomeLink = props => <NamedLink href='/' {...props} />
export const LoginLink = props => <NamedLink href='/login' {...props} />
export const LogoutLink = props => <NamedLink href='/api/logout' {...props} />
export const RssFeedLink = props => <NamedLink href='https://feedpress.me/mailmask' title='RSS feed' {...props} />
export const SelfHostingLink = props => <NamedLink href={SELF_HOSTING_GUIDE_URL} title='Self-hosting guide' {...props} />
export const TwitterLink = props => <NamedLink href={TWITTER_URL} title='Twitter' {...props} />
export const GithubLink = props => <NamedLink href={GITHUB_URL} title='Github' {...props} />
export const HowItWorksLink = props => <NamedLink href='/#how-it-works' noScroll={true} {...props} />
export const PricingLink = props => <NamedLink href='/pricing' {...props} />
export const FaqLink = props => <NamedLink href='/faq' {...props} />
export const HelpLink = props => <NamedLink href='/help' {...props} />
export const AboutLink = props => <NamedLink href='/about' {...props} />
export const TermsLink = props => <NamedLink href='/terms' {...props} />
export const PrivacyLink = props => <NamedLink href='/privacy' {...props} />
export const BlogLink = props => <NamedLink href='/blog' {...props} />
export const BlogPostLink = ({ postSlug, ...props }) => (
  <NamedLink href='/blog/[slug]' as={`/blog/${postSlug}`} {...props} />
)

