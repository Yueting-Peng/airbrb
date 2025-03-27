import React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'antd'
import {
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  ExportOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import SearchComponent from './SearchComponent'

const HomeDropdownStyled = styled(Dropdown.Button)`
  align-self: center;
  display: flex;
  justify-content: flex-end;
  width: auto;
  margin-right: 20px;
`

const HomeDropdown = ({ isLogin, handleMenuClick }) => {
  const itemsUnlogged = [
    {
      label: 'Log in',
      key: 'login',
      icon: <LoginOutlined />,
    },
    {
      label: 'Sign up',
      key: 'register',
      icon: <UserAddOutlined />,
    },
  ]
  const itemsLogged = [
    {
      label: 'hosting page',
      key: 'hosting',
      icon: <UnorderedListOutlined />,
    },
    {
      label: 'My Reservations',
      key: 'reservations',
      icon: <CalendarOutlined />,
    },
    {
      label: 'Log out',
      key: 'logout',
      icon: <ExportOutlined />,
      danger: true,
    },
  ]

  const menuProps = {
    items: isLogin() ? itemsLogged : itemsUnlogged,
    onClick: handleMenuClick,
  }

  return (
    <HomeDropdownStyled
      menu={menuProps}
      placement="bottom"
      icon={isLogin() ? <UserOutlined /> : <LoginOutlined />}
    >
      <SearchComponent />
    </HomeDropdownStyled>
  )
}

export default HomeDropdown
