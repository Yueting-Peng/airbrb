import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BookingRequests from './BookingRequest'
import http from '../utils/request'
import { message } from 'antd'
import ListingStats from './ListingStates'
import moment from 'moment'

const ManageBooking = () => {
  const [filteredBookings, setFilteredBookings] = useState([])
  const [bookingHistory, setBookingHistory] = useState([])
  const [daysBookedThisYear, setDaysBookedThisYear] = useState(0)
  const [profitThisYear, setProfitThisYear] = useState(0)
  const [DaysOnline, setDaysOnline] = useState(0)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    http.get('/bookings').then((res) => {
      const pendingBookings = res.bookings.filter(
        (booking) =>
          booking.listingId === params.listingId && booking.status === 'pending'
      )
      setFilteredBookings(pendingBookings) // Update state for pending bookings

      const historyBookings = res.bookings.filter(
        (booking) =>
          booking.listingId === params.listingId &&
          (booking.status === 'accepted' || booking.status === 'denied')
      )
      setBookingHistory(historyBookings) // Update state for booking history

      const currentYear = new Date().getFullYear()
      const acceptedBookingsThisYear = res.bookings.filter(
        (booking) =>
          booking.listingId === params.listingId &&
          booking.status === 'accepted' &&
          new Date(booking.dateRange.start).getFullYear() === currentYear
      )

      // Calculate total nights booked this year
      const totalNights = acceptedBookingsThisYear.reduce((acc, booking) => {
        const start = moment(booking.dateRange.start, 'YYYY-MM-DD')
        const end = moment(booking.dateRange.end, 'YYYY-MM-DD')
        const nights = end.diff(start, 'days')
        return acc + nights
      }, 0)

      setDaysBookedThisYear(totalNights)

      // Calculate total profit this year
      const totalProfit = acceptedBookingsThisYear.reduce((acc, booking) => {
        return acc + booking.totalPrice
      }, 0)
      setProfitThisYear(totalProfit)
    })
    http.get(`/listings/${params.listingId}`).then((res) => {
      const startDate = moment(res.listing.postedOn)
      const daysOnline = moment().diff(startDate, 'days')
      setDaysOnline(daysOnline)
    })
  }, [params.listingId])

  const handleAccept = (id) => {
    http
      .put(`/bookings/accept/${id}`)
      .then(navigate(0))
      .catch((error) => {
        message.open({
          type: 'error',
          content: error.message || 'failed to accept booking!',
        })
      })
  }

  const handleDeny = (id) => {
    http
      .put(`/bookings/decline/${id}`)
      .then(navigate(0))
      .catch((error) => {
        message.open({
          type: 'error',
          content: error.message || 'failed to deny booking!',
        })
      })
  }

  return (
    <>
      <h2>Manage Requests</h2>
      <BookingRequests
        bookingData={filteredBookings}
        onAccept={handleAccept}
        onDeny={handleDeny}
      />
      <br />
      <h2>Listing Overview</h2>
      <ListingStats
        DaysOnline={DaysOnline}
        daysBookedThisYear={daysBookedThisYear}
        profitThisYear={profitThisYear}
      />
      <br />
      <h2>Booking History</h2>
      <BookingRequests bookingData={bookingHistory} history={true} />
      <div>ManageBooking {params.listingId}</div>
    </>
  )
}

export default ManageBooking
