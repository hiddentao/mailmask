import React from 'react'
import styled from '@emotion/styled'
import { font } from 'emotion-styled-utils'

import { getAppConfig } from '../src/frontend/appConfig'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import NoSsr from '../src/frontend/components/NoSsr'

const { SUPPORT_EMAIL } = getAppConfig()

const StyledContentWrapper = styled(ContentWrapper)`
  h1 {
    line-height: 1.3em;
  }
`

const ErrorStack = styled.pre`
  ${font('body')}
  font-size: 0.8rem;
  line-height: 1.2em;
  color: ${({ theme }) => theme.errorPageStackBgColor};
  border-radius: 5px;
  padding: 1em;
  margin: 0 0 1rem;
`

const Explanation = styled.p`
  ${font('body')}
  font-size: 1rem;
  line-height: 1.3em;
  color: ${({ theme }) => theme.errorPageExplanationTextColor};
  margin: 2rem 0 0;
  a {
    margin: 0 0.5em;
  }
`

export default class ErrorPage extends React.Component {
  static async getInitialProps ({ res, query: { msg, stack } = {} }) {
    /* eslint-disable-next-line no-nested-ternary */
    return { msg, stack: res && res.inDevMode ? stack : null }
  }

  render () {
    const { msg, stack } = this.props

    const finalMsg = msg || `Sorry, we've encountered a problem`

    return (
      <Layout>
        <StyledContentWrapper>
          <h1>{finalMsg}</h1>
          {stack ? <ErrorStack>{stack}</ErrorStack> : null}
          <Explanation>
            If you keep seeing this
            error please get in touch with us at
            <NoSsr><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></NoSsr>
          </Explanation>
        </StyledContentWrapper>
      </Layout>
    )
  }
}
