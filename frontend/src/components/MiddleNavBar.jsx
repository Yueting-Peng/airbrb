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
    navigate('/')
  }, [navigate])

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
    if (e.key === 'all') {
      navigate('/')
    }
    if (e.key === 'host') {
      navigate('/hosting')
    }
    if (e.key === 'setting') {
      navigate('/')
    }
  }

  const items = [
    {
      label: 'All published listings',
      key: 'all',
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'Switch to hosting',
      key: 'host',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Navigation Three',
      key: 'setting',
      icon: <SettingOutlined />,
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
