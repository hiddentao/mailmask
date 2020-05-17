import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { DashboardLink } from '../../Link'
import { DASHBOARD } from '../../../constants'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'flex-start', basis: 0 })};

  a {
    margin-bottom: 1rem;
    text-align: left;
    white-space: nowrap;
  }
`


const Sidebar = ({ className, onSelectItem }) => {
  return (
    <Container className={className}>
      {Object.entries(DASHBOARD.PANELS).map(([ id, label ]) => (
        <DashboardLink key={id} panel={id} anchorProps={{ onClick: onSelectItem }}>
          {label}
        </DashboardLink>
      ))}
    </Container>
  )
}

export default Sidebar
