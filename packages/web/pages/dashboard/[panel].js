import React, { useMemo } from 'react'
import { useRouter } from 'next/router'

import Frame from '../../src/frontend/components/page/dashboard/Frame'


const DashboardPanel = () => {
  const router = useRouter()
  const { panel } = useMemo(() => router.query, [ router ])

  return <Frame panel={panel} />
}

export default DashboardPanel
