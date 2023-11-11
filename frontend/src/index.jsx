import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Register from './pages/Register'
import Login from './pages/Login'
import Host from './pages/Host'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <App />,
  },
  {
    path: '/profile',
    element: <App />,
  },
  {
    path: '/hosting',
    element: <Host />,
  },
])

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
