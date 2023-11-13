import React, { useEffect } from 'react'
import useHttp from '../utils/useHttp'
import { message } from 'antd'
import ListingCard from './ListingCard'
import styled from 'styled-components'

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
  const { isLoading, error, data, request } = useHttp()

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
      console.log('Airbnb listings data:', data.listings)
    }
  }, [error, data])
  const onCardClick = (listingId) => {
    console.log('Clicked listing:', listingId)
  }

  return (
    <ListingWrap>
      {data &&
        data.listings &&
        Object.entries(data.listings || {}).map(([id, listing]) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onCardClick={() => onCardClick(listing.id)}
          />
        ))}
      {isLoading ? 'Loading' : ''}
    </ListingWrap>
  )
}

export default AllListings
