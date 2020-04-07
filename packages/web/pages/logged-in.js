import React from 'react'

import { withApollo } from '../src/frontend/hoc'
import Layout from '../src/frontend/components/Layout'
import { AccountLink } from '../src/frontend/components/Link'
import Authenticated from '../src/frontend/components/Authenticated'
import SetUsernameForm from '../src/frontend/components/SetUsernameForm'
import Button from '../src/frontend/components/Button'

const LoggedInPage = () => {
  return (
    <Layout>
      <Authenticated>
        {({ signedUp }) => (signedUp ? (
          <div>
            <p>You are now logged in.</p>
            <AccountLink><Button>Goto my account</Button></AccountLink>
          </div>
        ) : (
          <div>
            <p>Thanks for signing up.</p>
            <SetUsernameForm />
          </div>
        ))}
      </Authenticated>
    </Layout>
  )
}

export default withApollo(LoggedInPage)


