// HostSidebar.jsx
import React from 'react'
import { Drawer } from 'antd'
import SidebarMenu from './HostSidebarMenu'

const HostSidebar = ({
  drawerVisible,
  setDrawerVisible,
  onCreateListingClick,
}) => {
  const onMenuItemClick = (e) => {
    console.log('Menu item clicked:', e.key)
    setDrawerVisible(false)
  }
  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={() => setDrawerVisible(false)}
      open={drawerVisible}
    >
      <SidebarMenu
        onMenuItemClick={onMenuItemClick}
        onCreateListingClick={() => {
          onCreateListingClick()
          setDrawerVisible(false)
        }}
      />
    </Drawer>
  )
}

export default HostSidebar
