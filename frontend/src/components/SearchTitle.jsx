import React from 'react'
import { StyledSearchTitle } from './SearchResultsStyles'
import { formatDate } from '../utils/formatDate'

const SearchTitle = ({ queryParams }) => {
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

  return <StyledSearchTitle>{generateTitle()}</StyledSearchTitle>
}

export default SearchTitle
