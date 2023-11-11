import React from 'react'
import styled from 'styled-components'
import { Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import HomeDropdown from './components/HomeDropdown.jsx'
import useHttp from './utils/useHttp'
import AirbrbLogo from './components/logo.jsx'

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
  border-top: 1px solid #fdf7ff;
  border-bottom: 1px solid #fdf7ff;
  display: flex;
`
export const HomeHeader = styled(TitleHeader)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #ff385c;
`
const HomeSearch = styled(Search)`
  width: 300px;
  align-self: center;
`

const HomeNavbar = styled.div`
  height: 100px;
  border-bottom: 1px solid #ebebeb;
`

const ListingPane = styled.main``
const App = () => {
  const isLogin = () => {
    return !!localStorage.getItem('token')
  }
  const { error, request } = useHttp()
  const navigate = useNavigate()
  const onSearch = (value, _e, info) => console.log(info?.source, value)
  const handleMenuClick = async (e) => {
    console.log('click', e)
    if (e.key === 'logout') {
      const isConfirmed = confirm(
        'Are you sure you want to log out of your current account?'
      )
      if (!isConfirmed) return
      await request('post', '/user/auth/logout')
      localStorage.removeItem('token')
      navigate('/dashboard')
    } else {
      navigate(`/${e.key}`)
    }
  }
  React.useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'Logout failed!',
      })
    }
  }, [error])

  return (
    <Homepage>
      <HomeHeader>
        <AirbrbLogo />
        <HomeSearch
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
        <HomeDropdown isLogin={isLogin} handleMenuClick={handleMenuClick} />
      </HomeHeader>
      <HomeNavbar></HomeNavbar>
      <ListingPane></ListingPane>
    </Homepage>
  )
}

export default App
