import React, { useCallback, useMemo, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { toast } from 'react-toastify'
import matchSorter from 'match-sorter'
import { font } from 'emotion-styled-utils'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
} from 'react-table'

import { getAppConfig } from '../../../appConfig'
import { trackEvent } from '../../../analytics'
import { useSafeMutation, useSafeQuery } from '../../../hooks'
import { GetMyMasksQuery } from '../../../../graphql/queries'
import { UpdateMaskStatusMutation } from '../../../../graphql/mutations'
import QueryResult from '../../QueryResult'
import TextInput from '../../TextInput'
import Icon from '../../IconButton'

const { DOMAIN } = getAppConfig()

const Table = styled.table`
  border: none;
`

const HeaderCell = styled.th`
  ${font('header')};
  padding: 1rem 0;
  text-align: left;
  min-width: 200px;
`

const GlobalFilterTextInput = styled(TextInput)`
  font-size: 0.9rem;
  padding: 0.5em;
  margin: 0.3rem 0;
  width: 70%;
  max-width: 400px;
`

const DataRow = styled.tr`
  ${font('body')};
  font-size: 1.2rem;

  td {
    padding: 0.5rem 0;
  }
`

const ToggleButton = styled(Icon)`
  border: none;
  color: ${({ isOn, theme }) => (isOn ? theme.dashboardPageMasksTableMaskOnIconColor : theme.dashboardPageMasksTableMaskOffIconColor)};
`

const MaskStatusText = styled.span`
  ${font('header', 'normal', 'italic')};
  color: ${({ theme }) => theme.dashboardPageMasksTableMaskStatusTextColor};
`

const MaskPrefix = styled.span``
const MaskSuffix = styled.span`
  font-size: 80%;
  margin-left: 0.2em;
  color: ${({ theme }) => theme.dashboardPageMasksTableMaskSuffixTextColor};
`


function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <GlobalFilterTextInput
      onChange={setGlobalFilter}
      value={globalFilter || ''}
      placeholder={`Filter ${count} entries...`}
    />
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
  myUsername,
}) => {
  const [ value, setValue ] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [ initialValue ])

  const onToggle = useCallback(() => {
    trackEvent('dashboard', 'SetMaskStatus', !value)
    setValue(!value)
    setMaskStatus(row.original.name, !value)
  }, [ value, row, setMaskStatus ])

  if ('enabled' === id) {
    const iconName = value ? 'check-circle' : 'times-circle'

    return (
      <span>
        <ToggleButton isOn={value} icon={{ name: iconName }} onClick={onToggle} />
        <MaskStatusText>{value ? 'email will be sent to you' : 'email will be BLOCKED'}</MaskStatusText>
      </span>
    )
  } else {
    return (
      <span>
        <MaskPrefix>
          {value}
        </MaskPrefix>
        <MaskSuffix>
          @{myUsername}.{DOMAIN}
        </MaskSuffix>
      </span>
    )
  }
}


const defaultColumn = {
  Cell: CellRenderer,
}


const MaskTable = ({ items, setMaskStatus, myUsername }) => {
  const data = useMemo(() => items.map(({ name, enabled }) => {
    return {
      name,
      enabled,
    }
  }), [ items ])

  const columns = useMemo(() => [
    {
      Header: 'Alias',
      accessor: 'name'
    },
    {
      Header: 'Status',
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
    myUsername,
  }, useGlobalFilter, useSortBy)

  return (
    <Table {...getTableProps()} cellSpacing="20">
      <thead>
        <tr>
          <th colSpan={visibleColumns.length}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </HeaderCell>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row)
          return (
            <DataRow {...row.getRowProps()} isEven={index % 2 === 0}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </DataRow>
          )
        })}
      </tbody>
    </Table>
  )
}


const Container = styled.div``


const Masks = ({ className, username }) => {
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
    <Container className={className}>
      <QueryResult {...query}>
        {({ result }) => <MaskTable {...result} setMaskStatus={setMaskStatus} myUsername={username} />}
      </QueryResult>
    </Container>
  )
}


export default Masks
