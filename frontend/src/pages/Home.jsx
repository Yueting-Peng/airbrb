import React from 'react'
import MiddleNavBar from '../components/MiddleNavBar'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const MainContainer = styled.section`
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  margin: auto;
`
const Home = () => {
  const isLogin = () => {
    return !!localStorage.getItem('token')
  }
  return (
    <>
      <MiddleNavBar isLogin={isLogin}/>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  )
}

export default Home
