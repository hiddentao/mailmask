import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { _, formatDate } from '@mailmask/utils'

import posts from '../../src/blog'
import Layout from '../../src/frontend/components/Layout'
import { BlogLink } from '../../src/frontend/components/Link'
import Markdown from '../../src/frontend/components/Markdown'
import ContentWrapper from '../../src/frontend/components/ContentWrapper'
import Seo from '../../src/frontend/components/Seo'

const Container = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
`

const Date = styled.div`
  ${({ theme }) => theme.font('body', 'thin')};
  font-size: 1.2rem;
  margin: 0 0 2rem;
  color: ${({ theme }) => theme.blogPage.post.date.textColor};
`

const StyledMarkdown = styled(Markdown)`
  margin: 0 0 2rem;
`

const BlogPost = ({ post }) => {
  return (
    <Layout>
      <Seo
        title={post.title}
        description={_.trunc(post.content, { length: 100 })}
        publishedTime={post.date}
      />
      <ContentWrapper>
        <Container>
          <BlogLink>Blog &raquo;</BlogLink>
          <h1>{post.title}</h1>
          <Date>{formatDate(post.date, 'MMM do, yyyy')}</Date>
          <StyledMarkdown>{post.content}</StyledMarkdown>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export async function getStaticProps ({ params: { slug } }) {
  return {
    props: {
      post: posts.find(({ slug: s }) => s === slug)
    },
  }
}

export async function getStaticPaths () {
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: false,
  }
}

export default BlogPost

