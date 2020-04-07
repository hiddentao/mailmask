import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  useTable,
  useSortBy,
} from 'react-table'


import { withApollo } from '../src/frontend/hoc'
import { LogoutLink } from '../src/frontend/components/Link'
import { useSafeMutation, useSafeQuery } from '../src/frontend/hooks'
import { GetMyMasksQuery } from '../src/graphql/queries'
import { DeleteAccountMutation } from '../src/graphql/mutations'
import Layout from '../src/frontend/components/Layout'
import Button from '../src/frontend/components/Button'
import QueryResult from '../src/frontend/components/QueryResult'
import AuthenticatedAndFullySignedUp from '../src/frontend/components/AuthenticatedAndFullySignedUp'

const DeleteAccount = () => {
  const router = useRouter()
  const [ doDeleteMutation, deleteAccountMutation ] = useSafeMutation(DeleteAccountMutation)
  const deleteAccount = useCallback(async () => {
    const { error } = await doDeleteMutation()

    if (!error) {
      router.replace('/')
    }
  }, [ router, doDeleteMutation ])

  return (
    <div>
      <Button onClick={deleteAccount}>Delete account</Button>
      <QueryResult {...deleteAccountMutation} />
    </div>
  )
}


const MaskTable = ({ items }) => {
  const data = useMemo(() => items.map(({ name, enabled }) => {
    return {
      name,
      enabled: enabled ? 'Yes' : 'No'
    }
  }), [ items ])

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Enabled',
      accessor: 'enabled',
    }
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy)

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>

              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}



const AccountPage = () => {
  const query = useSafeQuery(GetMyMasksQuery, {
    variables: {
      paging: {
        page: 1,
        resultsPerPage: 1000000
      }
    }
  })

  return (
    <Layout>
      <AuthenticatedAndFullySignedUp>
        <QueryResult {...query}>
          {({ result }) => <MaskTable {...result} />}
        </QueryResult>
        <hr />
        <LogoutLink>Logout</LogoutLink>
        <hr />
        <DeleteAccount />
      </AuthenticatedAndFullySignedUp>
    </Layout>
  )
}

export default withApollo(AccountPage)


