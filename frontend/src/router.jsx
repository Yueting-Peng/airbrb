import React from 'react'
import App from './App'
import Register from './pages/Register'
import Login from './pages/Login'
import Host from './pages/Host'
import Home from './pages/Home'
import { createBrowserRouter, useLocation, Navigate } from 'react-router-dom'
import CreateListing from './components/CreateListing'
import AllListings from './components/AllListings'
import MyListings from './components/MyListings'
import EditListing from './components/EditListing'
import ViewListingDetail from './components/ViewListingDetail'
import SearchResults from './components/SearchResults'
import ManageBooking from './components/ManageBooking'
import Reservations from './components/Reservations'
import { message } from 'antd'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token) {
    message.warning('You must be logged in to access this page.')

    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

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
            path: 'detail/:listingId',
            element: <ViewListingDetail />,
          },
          {
            path: 'search',
            element: <SearchResults />,
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
        path: 'reservations',
        element: (
          <RequireAuth>
            <Reservations />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '/hosting',
    element: (
      <RequireAuth>
        <Host />
      </RequireAuth>
    ),
    children: [
      {
        path: '',
        element: <MyListings />,
      },
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
      {
        path: 'manage-booking/:listingId',
        element: <ManageBooking />,
      },
    ],
  },
])

export default router
