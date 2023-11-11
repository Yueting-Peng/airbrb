// SidebarMenu.jsx
import React from 'react'
import { Menu } from 'antd'
import {
  HouseAdd,
  ViewList,
  JournalCheck,
  BoxArrowRight,
  GlobeAmericas,
} from 'react-bootstrap-icons'
import { UnorderedListOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledMenuItem = styled(Menu.Item)`
  color: #574141;
  @media (min-width: 950px) {
    font-size: 16px;
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
const SidebarMenu = ({ onMenuItemClick, onCreateListingClick }) => {
  return (
    <StyledMenu onClick={onMenuItemClick} mode="inline">
      <StyledMenuItem key="1">
        <UnorderedListOutlined />
        &nbsp;&nbsp;View all listings
      </StyledMenuItem>
      <StyledMenuItem key="2">
        <ViewList />
        &nbsp;&nbsp;&nbsp;My listings
      </StyledMenuItem>
      <StyledMenuItem key="3">
        <JournalCheck /> &nbsp;&nbsp;Reservations
      </StyledMenuItem>
      <StyledMenuItem key="4" onClick={onCreateListingClick}>
        <HouseAdd />
        &nbsp;&nbsp; Create a new listing
      </StyledMenuItem>
      <StyledMenuItem key="5">
        <GlobeAmericas />
        &nbsp;&nbsp; Switch to travelling
      </StyledMenuItem>
      <StyledMenuItem key="6">
        <BoxArrowRight />
        &nbsp;&nbsp;&nbsp;Log out
      </StyledMenuItem>
    </StyledMenu>
  )
}

export default SidebarMenu
