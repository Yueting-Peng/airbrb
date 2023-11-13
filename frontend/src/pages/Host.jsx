import React from 'react'
import styled from 'styled-components'
import { MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import HostSidebar from '../components/HostNavBar'
import SidebarMenu from '../components/HostSidebarMenu'
import AirbrbLogo from '../components/logo.jsx'

const HostPage = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const HostHeader = styled.header`
  height: 80px;
  padding: 0 60px;
  color: #ff385c;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 950px) {
    padding: 0 20px;
    justify-content: space-between;
  }
`
const MenuBtn = styled(Button)`
  display: none;
  @media (max-width: 950px) {
    display: block;
  }
`
const HostMain = styled.main`
  display: flex;
`
const HostMenuBig = styled.aside`
  width: 20%;
  min-width: 230px;
  @media (max-width: 950px) {
    display: none;
  }
`
const HostMainRight = styled.div`
  flex: 1;
  padding: 30px;
`

const Host = () => {
  const navigate = useNavigate()
  const [drawerVisible, setDrawerVisible] = React.useState(false)

  const handleCreateListingClick = () => {
    navigate('/hosting/create-listing')
  }
  const handleMyListingsClick = () => {
    navigate('/hosting/my-listings')
  }
  const goHome = () => {
    navigate('/')
  }

  return (
    <HostPage>
      <HostHeader>
        <AirbrbLogo onClick={goHome} />
        <h2>Hosting</h2>
        <MenuBtn type="primary" onClick={() => setDrawerVisible(true)}>
          <MenuOutlined />
        </MenuBtn>
      </HostHeader>
      <HostMain>
        <HostMenuBig>
          <SidebarMenu
            onCreateListingClick={handleCreateListingClick}
            handleMyListingsClick={handleMyListingsClick}
          />
        </HostMenuBig>
        <HostSidebar
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
          onCreateListingClick={handleCreateListingClick}
          handleMyListingsClick={handleMyListingsClick}
        />
        <HostMainRight>
          <Outlet />
        </HostMainRight>
      </HostMain>
    </HostPage>
  )
}

export default Host
