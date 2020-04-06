import React, { useMemo, } from 'react'
import DefaultLink from 'next/link'
import url from 'url'

const wrapInAnchor = children => {
  let gotAnchor = false

  React.Children.forEach(children, c => {
    if (c.type === 'a' || c.__emotion_base === 'a') {
      gotAnchor = true
    }
  })

  return (gotAnchor ? children : <a>{children}</a>)
}

export const Link = ({ href, as, query = {}, children }) => {
  const finalHref = useMemo(() => url.format({ pathname: href, query }), [ href, query ])
  const external = useMemo(() => !!href.startsWith('http'), [ href ])

  return (
    <DefaultLink
      href={finalHref}
      {...(as ? { as } : null)}
      {...(external ? { prefetch: false } : null)}
      scroll={true}
    >
      {wrapInAnchor(children)}
    </DefaultLink>
  )
}
