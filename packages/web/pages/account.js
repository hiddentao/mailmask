import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { toast } from 'react-toastify'
import matchSorter from 'match-sorter'
import { useRouter } from 'next/router'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
} from 'react-table'


import { withApollo } from '../src/frontend/hoc'
import { LogoutLink } from '../src/frontend/components/Link'
import { useSafeMutation, useSafeQuery } from '../src/frontend/hooks'
import { GetMyMasksQuery } from '../src/graphql/queries'
import { DeleteAccountMutation, UpdateMaskStatusMutation } from '../src/graphql/mutations'
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


function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          // Set undefined to remove the filter entirely
          setGlobalFilter(e.target.value || undefined)
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [ row => row.values[id] ] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


const CellRenderer = ({
  value: initialValue,
  row,
  column: { id },
  setMaskStatus,
}) => {
  const [ value, setValue ] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [ initialValue ])

  const onToggle = useCallback(() => {
    setValue(!value)
    setMaskStatus(row.original.name, !value)
  }, [ value, row, setMaskStatus ])

  if ('enabled' === id) {
    return <input type="checkbox" checked={!!value} onChange={onToggle} />
  } else {
    return value
  }
}


const defaultColumn = {
  Cell: CellRenderer,
}


const MaskTable = ({ items, setMaskStatus }) => {
  const data = useMemo(() => items.map(({ name, enabled }) => {
    return {
      name,
      enabled,
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

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    defaultColumn,
    filterTypes,
    setMaskStatus,
  }, useGlobalFilter, useSortBy)

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
        <tr>
          <th
            colSpan={visibleColumns.length}
            style={{
              textAlign: 'left',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
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


const Masks = () => {
  const query = useSafeQuery(GetMyMasksQuery, {
    variables: {
      paging: {
        page: 1,
        resultsPerPage: 1000000
      }
    }
  })

  const [ updateMaskStatus ] = useSafeMutation(UpdateMaskStatusMutation)

  const setMaskStatus = useCallback(async (name, enabled) => {
    const { error } = await updateMaskStatus({
      variables: {
        name,
        enabled,
      }
    })

    if (error) {
      toast.error(`Update error: ${error.message}`)
    }
  }, [ updateMaskStatus ])

  return (
    <QueryResult {...query}>
      {({ result }) => <MaskTable {...result} setMaskStatus={setMaskStatus} />}
    </QueryResult>
  )
}



const AccountPage = () => {
  return (
    <Layout>
      <AuthenticatedAndFullySignedUp>
        <Masks />
        <hr />
        <LogoutLink>Logout</LogoutLink>
        <hr />
        <DeleteAccount />
      </AuthenticatedAndFullySignedUp>
    </Layout>
  )
}

export default withApollo(AccountPage)


