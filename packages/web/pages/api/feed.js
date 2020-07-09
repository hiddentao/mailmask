import unified from 'unified'
import parse from 'remark-parse'
import html from 'remark-html'
import visit from 'unist-util-visit'

import config from '../../src/config'
import { buildBackendUrl } from '../../src/utils/url'
import posts from '../../src/blog'

// ensure relative paths are absolute
const fixAnchorHrefs = () => ast => {
  visit(ast, 'link', node => {
    if (node.url.startsWith('/')) {
      node.url = `${config.WEB_URL}${node.url}`
    }
  })
}

const md2html = markdown => {
  return unified()
    .use(parse)
    .use(fixAnchorHrefs)
    .use(html)
    .processSync(markdown).contents
}

const endpoint = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      res.status(200)
      res.setHeader('Content-Type', 'application/rss+xml')

      const publishedDate = new Date(posts[posts.length - 1].date)

      const items = posts.map(({ content, title, date, slug }) => `<item>
  <title>${title}</title>
  <description><![CDATA[${md2html(content)}]]></description>
  <link>${buildBackendUrl(`/blog/${slug}`)}</link>
  <pubDate>${new Date(date).toISOString()}</pubDate>
</item>
`
      )

      const str = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Mailmask Blog</title>
    <description>Blog for Mailmask - Easily stop unwanted email. Unlimited, free temporary email addresses, all forwarding to your real email address. Beat spam, protect your privacy.</description>
    <link>https://msk.sh/blog</link>
    <lastBuildDate>${publishedDate.toUTCString()}</lastBuildDate>
    <pubDate>${publishedDate.toUTCString()}</pubDate>
    ${items.join(`\n`)}
  </channel>
</rss>`

      res.end(str)

      break
    }
    default: {
      res.status(400)
      res.send('Bad request')
    }
  }
}

export default endpoint

