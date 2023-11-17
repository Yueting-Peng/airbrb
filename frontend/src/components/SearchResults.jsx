import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import http from '../utils/request'
import useHttp from '../utils/useHttp'
import { message, Spin } from 'antd'
import ListingCard from './ListingCard'
import { formatDate } from '../utils/formatDate'
import SearchTitle from './SearchTitle'
import { SearchedResultsContainer } from './SearchResultsStyles'

const SearchResults = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const loggedIn = localStorage.getItem('token')
  const userEmail = localStorage.getItem('email')
  const { isLoading, error, data, request } = useHttp()
  // const [extendedListings, setExtendedListings] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [userBookingStatuses, setUserBookingStatuses] = useState({})
  const [sortedPublishedListings, setSortedPublishedListings] = useState([])

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
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'failed to fetch all listings!',
      })
    }
  }, [error])

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
  }, [userBookingStatuses, data, request])

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
        localStorage.removeItem('lastSearchedDateRange')
        return sortedPublishedListings.filter((listing) => {
          const titleMatch = listing.title.toLowerCase().includes(searchText)
          const cityMatch = listing.address.city
            .toLowerCase()
            .includes(searchText)
          return titleMatch || cityMatch
        })
      }
      if (bedrooms) {
        localStorage.removeItem('lastSearchedDateRange')
        const bedroomRange = bedrooms.split(',')
        return sortedPublishedListings.filter((listing) => {
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
        localStorage.setItem('lastSearchedDateRange', [startDate, endDate])
        return sortedPublishedListings.filter((listing) => {
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
        // console.log(priceRange)
        localStorage.removeItem('lastSearchedDateRange')
        const prices = priceRange.split(',')
        return sortedPublishedListings.filter((listing) => {
          const [minPrice, maxPrice] = prices
          return (
            listing.price >= parseInt(minPrice, 10) &&
            listing.price <= parseInt(maxPrice, 10)
          )
        })
      }
      if (reviewRating) {
        localStorage.removeItem('lastSearchedDateRange')

        sortedPublishedListings.forEach((listing) => {
          if (listing.reviews && listing.reviews.length > 0) {
            const totalScore = listing.reviews.reduce(
              (sum, review) => sum + review.score,
              0
            )
            const averageScore = totalScore / listing.reviews.length
            listing.averageScore = averageScore
          } else {
            listing.averageScore = 0
          }
        })

        if (reviewRating === 'lowToHigh') {
          sortedPublishedListings.sort(
            (a, b) => a.averageScore - b.averageScore
          )
        } else if (reviewRating === 'highToLow') {
          sortedPublishedListings.sort(
            (a, b) => b.averageScore - a.averageScore
          )
        }

        return sortedPublishedListings
      }
    }

    if (sortedPublishedListings.length > 0) {
      setFilteredResults(filterListings())
    }
  }, [sortedPublishedListings, location.search])

  const onCardClick = (listingId) => {
    console.log('Clicked searched:', listingId)
    navigate(`/detail/${listingId}`)
  }

  return (
    <div>
      {isLoading
        ? (
        <Spin size="large" />
          )
        : (
        <>
          <SearchTitle />
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
