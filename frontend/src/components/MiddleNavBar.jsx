import React, { useState, useEffect } from 'react'
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

const MiddleNavBar = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('all')
  useEffect(() => {
    navigate('/all-listings')
  }, [navigate])

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
    if (e.key === 'all') {
      navigate('/all-listings')
    }
    if (e.key === 'host') {
      navigate('/hosting')
    }
    if (e.key === 'setting') {
      navigate('/all-listings')
    }
  }

  const items = [
    {
      label: 'View all listings',
      key: 'all',
      icon: <UnorderedListOutlined />,
      disabled: current === 'all',
    },
    {
      label: 'Switch to hosting',
      key: 'host',
      icon: <AppstoreOutlined />,
      disabled: current === 'host',
    },
    {
      label: 'Navigation Three',
      key: 'setting',
      icon: <SettingOutlined />,
      disabled: current === 'setting',
    },
  ]

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

export default MiddleNavBar
