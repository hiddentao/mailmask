import React from 'react'
import styled from '@emotion/styled'
import { formatDate } from '@mailmask/utils'
import { childAnchors } from 'emotion-styled-utils'

import posts from '../../src/blog'
import { withApollo } from '../../src/frontend/hoc'
import Layout from '../../src/frontend/components/Layout'
import Icon from '../../src/frontend/components/Icon'
import { BlogPostLink, RssFeedLink } from '../../src/frontend/components/Link'
import ContentWrapper from '../../src/frontend/components/ContentWrapper'
import Seo from '../../src/frontend/components/Seo'

const Container = styled.div`
  h1 {
    margin-bottom: 3rem;
  }

  h2 {
    ${({ theme }) => theme.font('body')};
    line-height: 1.3em;
    margin-bottom: 0;
  }
`

const Date = styled.small`
  ${({ theme }) => theme.font('header', 'regular')};
  margin-left: 1rem;
  font-size: 80%;
  color: ${({ theme }) => theme.blogPage.post.date.textColor};
`

const PostList = styled.ul``

const Post = styled.li`
  margin-bottom: 3rem;

  ${({ theme }) => childAnchors(theme.blogPage.post.title.anchor)};
`

const Preview = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.blogPage.post.preview.textColor};
  line-height: 1.3em;
`

const H1 = styled.h1`
  span {
    margin-right: 0.5rem;
  }

  a {
    border: none;
    font-size: 50%;
    padding: 0 0.5em;
  }
`

const RssIcon = styled(Icon)`
  color: ${({ theme }) => theme.blogPage.rssIconColor};
`

const BlogIndex = () => {
  return (
    <Layout>
      <Seo title='Blog' />
      <ContentWrapper>
        <Container>
          <H1>
            <span>Blog</span>
            <RssFeedLink><RssIcon name='rss' /></RssFeedLink>
          </H1>
          <PostList>
            {posts.map(({ slug, summary, title, date }) => (
              <Post key={slug}>
                <h2>
                  <BlogPostLink postSlug={slug}>{title}</BlogPostLink><Date>{formatDate(date, 'MMM do, yyyy')}</Date>
                </h2>
                <Preview>{summary}</Preview>
              </Post>
            ))}
          </PostList>
        </Container>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(BlogIndex)

