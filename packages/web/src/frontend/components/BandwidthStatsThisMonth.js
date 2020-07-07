import React from 'react'
import { SUB, thisMonthPeriodStr, bytesToBandwidthStr } from '@mailmask/utils'

import { GetMyMonthlyStatsQuery } from '../../graphql/queries'
import QueryResult from './QueryResult'
import { useSafeQuery } from '../hooks/apollo'

const BandwidthStatsThisMonth = ({ className, me }) => {
  const query = useSafeQuery(GetMyMonthlyStatsQuery, {
    fetchPolicy: 'cache-and-network'
  })

  return (
    <QueryResult {...query}>
      {({ result }) => (
        <div className={className}>
          <p>Bandwidth used ({thisMonthPeriodStr()}): {bytesToBandwidthStr(result.maskStats.numBytes)} out of {SUB.BANDWIDTH[me.sub.plan]} MB</p>
        </div>
      )}
    </QueryResult>
  )
}

export default BandwidthStatsThisMonth
