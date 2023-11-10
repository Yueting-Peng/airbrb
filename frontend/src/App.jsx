import React from 'react'
import styled from 'styled-components'
import { Input, Dropdown } from 'antd'
import {
  UserOutlined,
  MenuOutlined,
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const Homepage = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  @media (max-width: 950px) {
    flex-direction: column;
    padding: 10px;
  }
`
export const TitleHeader = styled.header`
  height: 80px;
  padding: 0 80px;
  color: #ff385c;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
`
const HomeHeader = styled(TitleHeader)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #1677ff;
`
const HomeSearch = styled(Search)`
  width: 300px;
  align-self: center;
`
const HomeDropdown = styled(Dropdown.Button)`
  width: 300px;
  align-self: center;
  width: auto;
`

const HomeNavbar = styled.div`
  height: 100px;
  border-bottom: 1px solid #ebebeb;
`
const ListingPane = styled.main``
const App = () => {
  const navigate = useNavigate()
  const onSearch = (value, _e, info) => console.log(info?.source, value)
  const handleMenuClick = (e) => {
    // message.info('Click on menu item.')
    console.log('click', e)
    navigate(`/${e.key}`)
  }

  const items = [
    {
      label: 'Sign up',
      key: 'register',
      icon: <UserAddOutlined />,
    },
    {
      label: 'Log in',
      key: 'login',
      icon: <LoginOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }
  return (
    <Homepage>
      <HomeHeader>
        <h2>
          <HomeOutlined />
          &nbsp; airbrb
        </h2>
        <HomeSearch
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <HomeDropdown
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
        >
          <MenuOutlined />
        </HomeDropdown>
      </HomeHeader>
      <HomeNavbar></HomeNavbar>
      <ListingPane></ListingPane>
    </Homepage>
  )
}

export default App
