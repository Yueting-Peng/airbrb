import { Statistic } from 'antd'
import React from 'react'

const DaysOnlineCheck = ({ DaysOnline }) => {
  return (
    <Statistic
      title="Days Online"
      value={isNaN(DaysOnline) ? 'Unpublished' : DaysOnline}
      suffix={isNaN(DaysOnline) ? '' : 'days'}
    />
  )
}

export default DaysOnlineCheck
