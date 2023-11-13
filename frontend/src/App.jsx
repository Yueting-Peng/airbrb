import React from 'react'
import styled from 'styled-components'
import { message } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import HomeDropdown from './components/HomeDropdown.jsx'
import useHttp from './utils/useHttp'
import AirbrbLogo from './components/logo.jsx'

const OuterContainer = styled.div`
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
  padding: 0 50px;
  border-top: 1px solid #fdf7ff;
  border-bottom: 1px solid #fdf7ff;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Main = styled.main``
const App = () => {
  const isLogin = () => {
    return !!localStorage.getItem('token')
  }
  const { error, request } = useHttp()
  const navigate = useNavigate()
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
  const goHome = () => {
    navigate('/')
  }

  return (
    <OuterContainer>
      <TitleHeader>
        <AirbrbLogo onClick={goHome} />
        <HomeDropdown isLogin={isLogin} handleMenuClick={handleMenuClick} />
      </TitleHeader>
      <Main>
        <Outlet />
      </Main>
    </OuterContainer>
  )
}

export default App
