// HostSidebar.jsx
import React from 'react'
import { Drawer } from 'antd'
import SidebarMenu from './HostSidebarMenu'

const HostSidebar = ({ drawerVisible, setDrawerVisible }) => {
  return (
    <Drawer
      title="Menu"
      placement="left"
      onClose={() => setDrawerVisible(false)}
      open={drawerVisible}
    >
      <SidebarMenu onClose={() => setDrawerVisible(false)}/>
    </Drawer>
  )
}

export default HostSidebar
