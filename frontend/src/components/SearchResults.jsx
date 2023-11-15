import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import http from '../utils/request'
import useHttp from '../utils/useHttp'
import { message, Spin } from 'antd'
import ListingCard from './ListingCard'
import styled from 'styled-components'

const SearchedResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 5px;
  }
`
const StyledSearchTitle = styled.h4`
  color: #574141;
  text-align: center;
`
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}
const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, error, data, request } = useHttp()
  const [extendedListings, setExtendedListings] = useState([])
  const [filteredResults, setFilteredResults] = useState([])

  const generateTitle = () => {
    const queryParams = new URLSearchParams(location.search)
    const bedrooms = queryParams.get('bedrooms')
    const dateRange = queryParams.get('dateRange')
    const priceRange = queryParams.get('priceRange')
    const reviewRating = queryParams.get('reviewRating')
    const searchText = queryParams.get('search')?.toLowerCase() || ''

    if (searchText) return `Properties with title and city "${searchText}"`
    if (bedrooms) {
      const bedroomRange = bedrooms.split(',')
      return `Properties with ${bedroomRange[0]} to ${bedroomRange[1]} bedrooms`
    }
    if (dateRange) {
      const dates = dateRange.split(',')
      const [startDate, endDate] = dates.map((date) => formatDate(date))
      return `Properties with avalible range from ${startDate} to ${endDate}`
    }
    if (priceRange) {
      const prices = priceRange.split(',')
      return `Properties with price from $${prices[0]} to $${prices[1]}`
    }
    if (reviewRating) {
      if (reviewRating === 'highToLow') {
        return 'Rating from high to low'
      }
      if (reviewRating === 'lowToHigh') {
        return 'Rating from low to high'
      }
    }

    return 'Search Listings'
  }

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
  }, [error])

  useEffect(() => {
    const fetchListingDetails = async () => {
      if (data && data.listings) {
        try {
          const detailsPromises = data.listings.map(async (listing) => {
            const response = await http.get(`/listings/${listing.id}`)
            if (response.listing.published) {
              return { ...response.listing, id: listing.id }
            }
            return null
          })

          const details = await Promise.all(detailsPromises)
          const filteredDetails = details.filter((detail) => detail !== null)
          setExtendedListings(filteredDetails)
        } catch (error) {
          message.error('Error fetching listing details')
        }
      }
    }
    fetchListingDetails()
  }, [data, request])

  useEffect(() => {
    console.log('Updated filteredResults:', filteredResults)
  }, [filteredResults])

  useEffect(() => {
    const filterListings = () => {
      const queryParams = new URLSearchParams(location.search)
      const bedrooms = queryParams.get('bedrooms')
      const dateRange = queryParams.get('dateRange')
      const priceRange = queryParams.get('priceRange')
      const reviewRating = queryParams.get('reviewRating')
      const searchText = queryParams.get('search')?.toLowerCase() || ''

      if (searchText) {
        return extendedListings.filter((listing) => {
          const titleMatch = listing.title.toLowerCase().includes(searchText)
          const cityMatch = listing.address.city
            .toLowerCase()
            .includes(searchText)
          return titleMatch || cityMatch
        })
      }
      if (bedrooms) {
        const bedroomRange = bedrooms.split(',')
        return extendedListings.filter((listing) => {
          const [minBedrooms, maxBedrooms] = bedroomRange
          return (
            listing.metadata.bedInfo.bedrooms >= parseInt(minBedrooms, 10) &&
            listing.metadata.bedInfo.bedrooms <= parseInt(maxBedrooms, 10)
          )
        })
      }
      if (dateRange) {
        const dates = dateRange.split(',')
        const [startDate, endDate] = dates.map((date) => formatDate(date))

        return extendedListings.filter((listing) => {
          return listing.availability.some((avail) => {
            const availStart = new Date(avail.start)
            const availEnd = new Date(avail.end)
            const rangeStart = new Date(startDate)
            const rangeEnd = new Date(endDate)
            return rangeStart >= availStart && rangeEnd <= availEnd
          })
        })
      }

      if (priceRange) {
        console.log(priceRange)
        const prices = priceRange.split(',')
        return extendedListings.filter((listing) => {
          const [minPrice, maxPrice] = prices
          return (
            listing.price >= parseInt(minPrice, 10) &&
            listing.price <= parseInt(maxPrice, 10)
          )
        })
      }
      if (reviewRating) {
        console.log(reviewRating)
      }
    }

    if (extendedListings.length > 0) {
      setFilteredResults(filterListings())
    }
  }, [extendedListings, location.search])

  const onCardClick = (listingId) => {
    console.log('Clicked searched:', listingId)
    navigate(`/detail/${listingId}`)
  }

  return (
    <div>
      {isLoading
        ? <Spin size="large" />
        : (
        <>
          <StyledSearchTitle>{generateTitle()}</StyledSearchTitle>
          <SearchedResultsContainer>
            {filteredResults.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onCardClick={() => onCardClick(listing.id)}
              />
            ))}
          </SearchedResultsContainer>
        </>
          )}
    </div>
  )
}

export default SearchResults
