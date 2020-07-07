import React from 'react'
import styled from '@emotion/styled'

import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import SupportEmail from '../src/frontend/components/SupportEmail'

const StyledContentWrapper = styled(ContentWrapper)`
  h1 {
    line-height: 1.3em;
  }
`

const ErrorStack = styled.pre`
  ${({ theme }) => theme.font('body')}
  font-size: 0.8rem;
  line-height: 1.2em;
  color: ${({ theme }) => theme.errorPage.stack.bgColor};
  border-radius: 5px;
  padding: 1em;
  margin: 0 0 1rem;
`

const Explanation = styled.p`
  ${({ theme }) => theme.font('body')}
  font-size: 1rem;
  line-height: 1.3em;
  color: ${({ theme }) => theme.errorPage.explanation.textColor};
  margin: 2rem 0 0;
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
            error please <a href="/help">get in touch with us</a>.
          </Explanation>
        </StyledContentWrapper>
      </Layout>
    )
  }
}
