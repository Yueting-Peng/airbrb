// SidebarMenu.jsx
import React from 'react'
import { Menu, message, Modal } from 'antd'
import {
  HouseAdd,
  ViewList,
  JournalCheck,
  BoxArrowRight,
  GlobeAmericas,
} from 'react-bootstrap-icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import http from '../utils/request'

const StyledMenuItem = styled(Menu.Item)`
  color: #574141;
  @media (min-width: 950px) {
    .anticon {
      margin-right: 5px;
    }
  }
`
const StyledMenu = styled(Menu)`
  @media (min-width: 950px) {
    padding-left: 10px;
  }
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const SidebarMenu = ({ onClose }) => {
  const navigate = useNavigate()

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'Mylistings':
        navigate('/hosting/my-listings')
        break
      case 'Reservations':
        navigate('/reservations')
        break
      case 'CreateNewListing':
        navigate('/hosting/create-listing')
        break
      case 'travelling':
        navigate('/')
        break
      case 'LogOut':
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

        break
      default:
        navigate(0)
        break
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <StyledMenu onClick={handleMenuClick} mode="inline">
      <StyledMenuItem key="Mylistings">
        <ViewList />
        &nbsp;&nbsp;&nbsp;My listings
      </StyledMenuItem>
      <StyledMenuItem key="Reservations">
        <JournalCheck /> &nbsp;&nbsp;Reservations
      </StyledMenuItem>
      <StyledMenuItem key="CreateNewListing">
        <HouseAdd />
        &nbsp;&nbsp; Create a new listing
      </StyledMenuItem>
      <StyledMenuItem key="travelling">
        <GlobeAmericas />
        &nbsp;&nbsp; Switch to travelling
      </StyledMenuItem>
      <StyledMenuItem key="LogOut">
        <BoxArrowRight />
        &nbsp;&nbsp;&nbsp;Log out
      </StyledMenuItem>
    </StyledMenu>
  )
}

export default SidebarMenu
