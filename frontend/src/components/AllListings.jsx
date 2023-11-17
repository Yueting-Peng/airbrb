import React, { useEffect, useState } from 'react'
import useHttp from '../utils/useHttp'
import { message, Spin } from 'antd'
import ListingCard from './ListingCard'
import styled from 'styled-components'
import http from '../utils/request'
import { useNavigate } from 'react-router-dom'

const ListingWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 5px;
  }
`

const AllListings = () => {
  const navigate = useNavigate()
  const loggedIn = localStorage.getItem('token')
  const userEmail = localStorage.getItem('email')
  const { isLoading, error, data, request } = useHttp()
  const [sortedPublishedListings, setSortedPublishedListings] = useState([])
  const [userBookingStatuses, setUserBookingStatuses] = useState({})
  useEffect(() => {
    if (loggedIn) {
      http
        .get('/bookings')
        .then((response) => {
          const statuses = response.bookings.reduce((acc, booking) => {
            if (booking.status !== 'declined' && userEmail === booking.owner) {
              if (!acc[booking.listingId]) {
                acc[booking.listingId] = []
              }
              acc[booking.listingId].push(booking.status)
            }
            return acc
          }, {})
          setUserBookingStatuses(statuses)
        })
        .catch((error) => console.error('Error fetching bookings:', error))
    } else {
      setUserBookingStatuses({})
    }

    request('get', '/listings')
  }, [loggedIn])
  useEffect(() => {
    if (data && data.listings) {
      // Sort listings by title
      const sortedListings = [...data.listings].sort((a, b) =>
        a.title.localeCompare(b.title)
      )

      const fetchListingsDetails = async () => {
        const detailedListings = await Promise.all(
          sortedListings.map(async (listing) => {
            const response = await http.get(`/listings/${listing.id}`)
            return { ...response.listing, id: listing.id }
          })
        )

        // Filter out published listings
        const publishedListings = detailedListings.filter(
          (listingObj) => listingObj.published
        )

        // Move listings with IDs in userBookingStatuses to the front
        const sortedPublishedListings = publishedListings.sort((a, b) => {
          const aInBookingStatuses = Object.prototype.hasOwnProperty.call(
            userBookingStatuses,
            a.id
          )
          const bInBookingStatuses = Object.prototype.hasOwnProperty.call(
            userBookingStatuses,
            b.id
          )

          if (aInBookingStatuses && !bInBookingStatuses) {
            return -1
          } else if (!aInBookingStatuses && bInBookingStatuses) {
            return 1
          } else {
            return 0
          }
        })

        // Add status to the listings
        const sortedPublishedListingsWithStatus = sortedPublishedListings.map(
          (listing) => ({
            ...listing,
            status: userBookingStatuses[listing.id] || null,
          })
        )

        setSortedPublishedListings(sortedPublishedListingsWithStatus)
      }

      fetchListingsDetails()
    }
  }, [userBookingStatuses, data, http])

  useEffect(() => {
    console.log(sortedPublishedListings)
  }, [sortedPublishedListings])

  useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'failed to fetch all listings!',
      })
    }
    if (data) {
      // console.log('Airbrb listings data:', data.listings)
    }
  }, [error, data])
  const onCardClick = (listingId) => {
    localStorage.removeItem('lastSearchedDateRange')
    navigate(`/detail/${listingId}`)
  }

  return (
    <>
      {isLoading
        ? (
        <Spin size="large" />
          )
        : (
        <ListingWrap>
          {sortedPublishedListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onCardClick={() => onCardClick(listing.id)}
            />
          ))}
        </ListingWrap>
          )}
    </>
  )
}

export default AllListings
