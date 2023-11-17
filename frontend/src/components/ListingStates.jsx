import React from 'react'
import { Card, Statistic, Row, Col } from 'antd'
import styled from 'styled-components'
import DaysOnlineCheck from './DaysOnlineCheck'

// Styled components
const ResponsiveRow = styled(Row)`
  @media (max-width: 768px) {
    margin: 0 -8px;
  }
`

const ResponsiveCol = styled(Col)`
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    flex: 0 0 100%;
    margin-bottom: 16px;
  }
`

const ListingStats = ({ DaysOnline, daysBookedThisYear, profitThisYear }) => {
  return (
    <Card title="Listing Statistics">
      <ResponsiveRow gutter={16}>
        <ResponsiveCol span={8}>
          <DaysOnlineCheck DaysOnline={DaysOnline} />
        </ResponsiveCol>
        <ResponsiveCol span={8}>
          <Statistic
            title="Days Booked This Year"
            value={daysBookedThisYear}
            suffix="days"
          />
        </ResponsiveCol>
        <ResponsiveCol span={8}>
          <Statistic
            title="Profit This Year"
            value={profitThisYear}
            prefix="$"
          />
        </ResponsiveCol>
      </ResponsiveRow>
    </Card>
  )
}

export default ListingStats
