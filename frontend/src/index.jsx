import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './router'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FF385C',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
