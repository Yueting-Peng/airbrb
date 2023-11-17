import React, { useState, useEffect } from 'react'
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { HouseAdd } from 'react-bootstrap-icons'
import { Menu, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import http from '../utils/request'

const MiddleNavBar = ({ isLogin }) => {
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
    if (e.key === 'Create') {
      navigate('/hosting/create-listing')
    }
    if (e.key === 'Logout') {
      Modal.confirm({
        title: 'Are you sure you want to log out?',
        content: 'Logging out will end your session',
        okType: 'danger',
        onOk () {
          http
            .post('/user/auth/logout')
            .then(() => {
              localStorage.removeItem('token')
              localStorage.removeItem('email')
              message.success('Logout successfully')
              navigate('/')
            })
            .catch((error) => {
              message.error(error.message || 'Logout failed')
            })
        },
        onCancel () {
          console.log('Cancel logout')
        },
      })
    }
    if (e.key === 'Login') {
      navigate('/login')
    }
    if (e.key === 'SignUp') {
      navigate('/register')
    }
  }

  const itemsLoggedIn = [
    {
      label: 'All published listings',
      key: 'all',
      icon: <UnorderedListOutlined />,
      id: 'allMenuItem',
    },
    {
      label: 'Switch to hosting',
      key: 'host',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Create a new listing',
      key: 'Create',
      icon: <HouseAdd />,
    },
    {
      label: 'Log out',
      key: 'Logout',
      icon: <LogoutOutlined />,
      id: 'logoutMenuItem',
    },
  ]

  const itemsUnLog = [
    {
      label: 'All published listings',
      key: 'all',
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'Log in',
      key: 'Login',
      icon: <LoginOutlined />,
      id: 'loginMenuItem',
    },
    {
      label: 'Sign up',
      key: 'SignUp',
      icon: <UserAddOutlined />,
    },
  ]

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={isLogin() ? itemsLoggedIn : itemsUnLog}
    />
  )
}

export default MiddleNavBar
