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
  const { isLoading, error, data, request } = useHttp()
  const [sortedPublishedListings, setSortedPublishedListings] = useState([])

  useEffect(() => {
    if (data && data.listings) {
      const sortedListings = [...data.listings].sort((a, b) =>
        a.title.localeCompare(b.title)
      )

      const sortedIds = sortedListings.map((listing) => listing.id)

      const fetchListingsDetails = async () => {
        const detailedListings = await Promise.all(
          sortedIds.map(async (id) => {
            const response = await http.get(`/listings/${id}`)
            return { ...response.listing, id }
          })
        )
        // console.log(detailedListings)

        const publishedListings = detailedListings.filter(
          (listingObj) => listingObj.published
        )

        setSortedPublishedListings(publishedListings)
      }

      fetchListingsDetails()
    }
  }, [data, request])

  useEffect(() => {
    request('get', '/listings')
  }, [request])

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
    console.log('Clicked listing:', listingId)
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
