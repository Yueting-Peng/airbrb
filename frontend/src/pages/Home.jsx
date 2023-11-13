import React from 'react'
import MiddleNavBar from '../components/MiddleNavBar'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const MainContainer = styled.section`
  width: 100%;
  overflow: auto;
`
const Home = () => {
  return (
    <>
      <MiddleNavBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  )
}

export default Home
