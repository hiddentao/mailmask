import React from 'react'
import styled from '@emotion/styled'
// import { useRouter } from 'next/router'

import { withApollo } from '../src/frontend/hoc'
import { LogoutLink } from '../src/frontend/components/Link'
import Layout from '../src/frontend/components/Layout'
import ContentWrapper from '../src/frontend/components/ContentWrapper'
import Seo from '../src/frontend/components/Seo'
import Masks from '../src/frontend/components/page/dashboard/Masks'
import AuthenticatedAndFullySignedUp from '../src/frontend/components/AuthenticatedAndFullySignedUp'
// import { DeleteAccountMutation } from '../src/graphql/mutations'
// import Button from '../src/frontend/components/Button'
// import QueryResult from '../src/frontend/components/QueryResult'


// const DeleteAccount = () => {
//   const router = useRouter()
//   const [ doDeleteMutation, deleteAccountMutation ] = useSafeMutation(DeleteAccountMutation)
//   const deleteAccount = useCallback(async () => {
//     const { error } = await doDeleteMutation()

//     if (!error) {
//       router.replace('/')
//     }
//   }, [ router, doDeleteMutation ])

//   return (
//     <div>
//       <Button onClick={deleteAccount}>Delete account</Button>
//       <QueryResult {...deleteAccountMutation} />
//     </div>
//   )
// }


const StyledMasks = styled(Masks)`
  margin: 3rem 0;
`

const BottomBlock = styled.div`
  border-top: 1px solid ${({ theme }) => theme.dashboardPageBottomBlockBorderColor};
  margin-top: 5rem;
  padding-top: 2rem;
`


const DashboardPage = () => {
  return (
    <Layout>
      <Seo title='Dashboard' />
      <ContentWrapper>
        <AuthenticatedAndFullySignedUp>
          {({ username }) => (
            <React.Fragment>
              <h1>Manage masks</h1>
              <StyledMasks username={username} />
              <BottomBlock>
                <LogoutLink>Logout</LogoutLink>
              </BottomBlock>
            </React.Fragment>
          )}
        </AuthenticatedAndFullySignedUp>
      </ContentWrapper>
    </Layout>
  )
}

export default withApollo(DashboardPage)


