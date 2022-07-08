import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { BlogPostLink } from '../src/frontend/components/Link'
import { headerHeight } from '../src/frontend/components/Header'
import Layout from '../src/frontend/components/Layout'
import Seo from '../src/frontend/components/Seo'
import ContentWrapper from '../src/frontend/components/ContentWrapper'

const TopBlock = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  height: calc(100vh - ${headerHeight});
  padding: 1rem;
  text-align: center;

  ${({ theme }) => theme.media.when({ minH: 'tall' })} {
    height: auto;
    min-height: 600px;
  }
`

const TopBlockForm = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  margin: 0 auto;
  text-align: center;

  ${({ theme }) => theme.media.when({ minW: 'desktop' })} {
    max-width: 600px;
    margin: 0;
  }
`

const TagLine = styled.p`
  ${({ theme }) => theme.font('body', 'thin')};
  font-size: 3.5rem;
  line-height: 1em;
  margin: 0 auto;
  max-width: 90%;

  ${({ theme }) => theme.media.when({ minW: 'tablet' })} {
    font-size: 4rem;
    margin: 0;
  }
`

const SubTagLine = styled.div`
  font-size: 1.3rem;
  line-height: 1.2em;
  margin: 1rem auto 0;
  max-width: 90%;

  ${({ theme }) => theme.media.when({ minW: 'tablet' })} {
    margin: 3rem 0 0;
    font-size: 1.5rem;
  }

  strong {
    ${({ theme }) => theme.font('body', 'bold')};
  }
`


const HomePage = () => {
  return (
    <Layout>
      <Seo />
      <TopBlock>
        <ContentWrapper>
          <TopBlockForm>
            <TagLine>
              Mailmask has shutdown as of May 2022.
            </TagLine>
            <SubTagLine>
              Please read our <BlogPostLink postSlug='mailmask-shutting-down'>blog post</BlogPostLink> for more details.
            </SubTagLine>
          </TopBlockForm>
        </ContentWrapper>
      </TopBlock>
    </Layout>
  )
}

export default HomePage


