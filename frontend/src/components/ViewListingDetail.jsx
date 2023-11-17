import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ImageGallery from './ImageGallery'
import AmenitiesComponent from './AmenitiesList'
import BookingComponent from './BookingComponent'
import styled from 'styled-components'
import ResponsiveDescriptions from './DetailDescriptions'
import http from '../utils/request'
import { message } from 'antd'
import ReviewsComponent from './ReviewsComponent'
import BookingHistory from './BookingHistory'

const ViewDetailContainer = styled.div`
  padding: 0 20px;
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`
const ViewDetailHeader = styled.h2`
  font-weight: bold;
  margin: 30px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`
const DetailBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const ViewListingDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [listingDetails, setListingDetails] = React.useState(null)
  const [bookingHistory, setBookingHistory] = React.useState([])
  const [availabilityRange, setAvailabilityRange] = React.useState([])

  const handleReservation = (reservationDetails) => {
    const isLogined = localStorage.getItem('token')
    console.log('Reservation Details:', reservationDetails)
    console.log('listingDetails ava date:', listingDetails.availability)
    if (!isLogined) {
      message.open({
        type: 'warning',
        content: 'You need to log in to make a reservation!',
      })
      navigate('/login')
      return
    }
    http
      .post(`/bookings/new/${params.listingId}`, reservationDetails)
      .then((res) =>
        message.open({
          type: 'success',
          content: `The reservation is successful, waiting for confirmation from the host. booking ID: ${res.bookingId}`,
        })
      )
      .catch((error) => {
        message.open({
          type: 'error',
          content: error.message || 'Reservation failed!',
        })
        console.error(error)
      })
  }
  React.useEffect(() => {
    http
      .get(`/listings/${params.listingId}`)
      .then((res) => {
        if (res.listing) {
          setListingDetails({
            title: res.listing.title,
            price: res.listing.price,
            address: res.listing.address,
            ...res.listing.metadata,
            thumbnail: res.listing.thumbnail,
            reviews: res.listing.reviews,
            availability: res.listing.availability,
          })
          setAvailabilityRange([...res.listing.availability])
          console.log([...res.listing.availability])
        }
      })
      .catch((error) => {
        message.error('Error fetching listing details')
        console.error(error)
      })

    if (localStorage.getItem('token')) {
      http.get('/bookings').then((res) => {
        if (res.bookings) {
          const userEmail = localStorage.getItem('email')
          const history = res.bookings.filter(
            (booking) =>
              booking.owner === userEmail &&
              booking.listingId === params.listingId &&
              booking.status === 'accepted'
          )
          setBookingHistory(history)
        }
      })
    }
  }, [params.listingId])

  return (
    <ViewDetailContainer>
      <ViewDetailHeader>{listingDetails?.title}</ViewDetailHeader>
      {listingDetails?.images && (
        <ImageGallery
          images={[listingDetails.thumbnail, ...listingDetails.images]}
        />
      )}
      <br />
      {listingDetails && <ResponsiveDescriptions {...listingDetails} />}
      {listingDetails?.otherInfo && listingDetails?.price && (
        <DetailBottomWrapper>
          <AmenitiesComponent amenities={listingDetails.otherInfo} />
          <BookingComponent
            dailyRate={listingDetails.price}
            onReserve={handleReservation}
            availability={availabilityRange}
          />
        </DetailBottomWrapper>
      )}
      {bookingHistory.length > 0 && (
        <BookingHistory bookings={bookingHistory} />
      )}

      {listingDetails?.reviews && (
        <ReviewsComponent reviews={listingDetails.reviews || []} />
      )}
      {/* <div>ViewListing: {params.listingId} </div> */}
    </ViewDetailContainer>
  )
}

export default ViewListingDetail
