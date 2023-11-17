import React from 'react'
import { Menu } from 'antd'
import {
  UnorderedListOutlined,
  ScheduleOutlined,
  RollbackOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const HostingSideBar = () => {
  const items = [
    getItem('My Listings', '1', <UnorderedListOutlined />),
    getItem('Manage Bookings', '2', <ScheduleOutlined />),
    getItem('Back to Travelling', '3', <RollbackOutlined />),
    getItem('Log Out', '4', <LogoutOutlined />),
  ]

  const onClick = (e) => {
    console.log('click ', e)
  }

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      mode="inline"
      items={items}
    />
  )
}

export default HostingSideBar
