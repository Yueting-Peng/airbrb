import React, { useEffect, useState } from 'react'
import useHttp from '../utils/useHttp'
import { message } from 'antd'
import MyListingTable from './MyListingTable'
import styled from 'styled-components'
import http from '../utils/request'

const MyListHeader = styled.header``

const MyListings = () => {
  const { isLoading, error, data, request } = useHttp()
  const userEmail = localStorage.getItem('email') || ''
  const [listingDetails, setListingDetails] = useState([])
  const refreshListings = () => {
    request('get', '/listings')
  }

  useEffect(() => {
    request('get', '/listings')
  }, [request])

  useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'failed to fetch listings!',
      })
    }
    // if (data) {
    //   console.log('Airbnb data.listings:', data)
    // }
  }, [error, data])

  useEffect(() => {
    if (data && data.listings) {
      const userListings = Object.entries(data.listings)
        .filter(([id, listing]) => listing.owner === userEmail)
        .map(([id, listing]) => listing.id)

      const listingDetailsPromises = userListings.map((listingId) =>
        http.get(`/listings/${listingId}`).then((response) => ({
          id: listingId,
          ...response.listing.metadata,
          ...response.listing.metadata.bedInfo,
          ...response.listing,
        }))
      )

      Promise.all(listingDetailsPromises)
        .then((fetchedDetails) => {
          setListingDetails(fetchedDetails)

          // 您可以根据需要进一步处理这些数据
          console.log(fetchedDetails)
        })
        .catch((error) => {
          message.error('Error fetching listing details')
          console.error(error)
        })
    }
  }, [data, userEmail, request])

  return (
    <>
      <MyListHeader>
        <h2>My Listings</h2>
      </MyListHeader>
      {isLoading
        ? 'Loading'
        : <MyListingTable
          data={listingDetails}
          refreshListings={refreshListings}
        />
      }
    </>
  )
}

export default MyListings
