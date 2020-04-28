import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { _ } from '@mailmask/utils'
import { font } from 'emotion-styled-utils'
import parse from 'remark-parse'
import unified from 'unified'
import remark2react from 'remark-react'

import { Link } from './Link'

const Container = styled.div`
  ${font('body')};
  font-size: 1rem;
  line-height: 1.5em;

  h2 {
    ${font('header')};
    margin-top: 2.5rem;
  }

  strong, b {
    font-weight: bolder;
  }

  em, i {
    font-style: italic;
  }

  ol, ul {
    margin: 1rem 0 1.5rem 1rem;
    list-style-type: disc;

    li {
      margin: 0.5rem 0;
    }
  }

  ol {
    list-style-type: decimal;
  }

  img {
    max-width: 100%;
    border: 1px solid ${({ theme }) => theme.markdownContentImageBorderColor};
  }

  pre {
    font-size: 1em;
  }
`

const CodeSpan = styled.span`
  font-family: monospace;
`

const P = styled.p`
  margin: 1rem 0;

  &:first-of-type {
    margin-top: 0;
  }
`

const ImgDiv = styled.div`
  margin: 2rem 0;
  text-align: center;

  & > img, & > div {
    display: block;
    margin: 0;
  }

  em {
    margin-top: 0.2rem;
    font-size: 90%;
  }
`

const RenderCode = ({ children }) => {
  return <CodeSpan>{children}</CodeSpan>
}

const RenderParagraph = ({ children }) => {
  const imgSrc = _.get(children, '0.props.src', '')
  const dotPos = imgSrc.lastIndexOf('.')
  const ext = (dotPos ? imgSrc.substring(dotPos + 1) : '').toLowerCase()

  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
    case 'bmp':
      return <ImgDiv>{children}</ImgDiv>
    default:
      return <P>{children}</P>
  }
}

const RenderImage = getImage => arg => {
  const { src, alt, title } = arg

  const finalSrc = (getImage ? getImage(src) : src)

  return <img src={finalSrc} alt={alt} title={title} />
}

const generateRenderAnchor = transformLink => ({ href, title, children }) => {
  const c = (Array.isArray(children) ? children.join(', ') : children)

  // external image links should be rendered using normal anchor tag
  if (!href || href.startsWith('http')) {
    return <a href={href} title={title}>{c}</a>
  } else {
    const attrs = (transformLink ? transformLink({ href, title }) : { href, title })
    return <Link {...attrs}><a>{c}</a></Link>
  }
}

const Markdown = ({ children: markdown, className, getImage, transformLink }) => {
  const output = useMemo(() => {
    return unified()
      .use(parse)
      .use(remark2react, {
        remarkReactComponents: {
          p: RenderParagraph,
          img: RenderImage(getImage),
          a: generateRenderAnchor(transformLink),
          code: RenderCode,
        }
      })
      .processSync(markdown).result
  }, [ markdown, getImage, transformLink ])

  return (
    <Container className={className}>{output}</Container>
  )
}

export default Markdown
