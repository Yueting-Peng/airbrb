import React from 'react'
import App from './App'
import Register from './pages/Register'
import Login from './pages/Login'
import Host from './pages/Host'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import CreateListing from './components/CreateListing'
import AllListings from './components/AllListings'
import MyListings from './components/MyListings'
import EditListing from './components/EditListing'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: '',
            element: <AllListings />,
          },
          {
            path: 'all-listings',
            element: <AllListings />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/hosting',
    element: <Host />,
    children: [
      {
        path: 'create-listing',
        element: <CreateListing />,
      },
      {
        path: 'my-listings',
        element: <MyListings />,
      },
      {
        path: 'edit/:listingId',
        element: <EditListing />,
      },
    ],
  },
])

export default router
