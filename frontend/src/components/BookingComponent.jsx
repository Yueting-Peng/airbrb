import React, { useState } from 'react'
import { DatePicker, Button } from 'antd'
import styled from 'styled-components'

const { RangePicker } = DatePicker

const BookingContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
`

const BookingComponent = ({ dailyRate, onReserve }) => {
  const [dates, setDates] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const onDateChange = (dates) => {
    setDates(dates)
    calculateTotal(dates)
  }

  const calculateTotal = (dates) => {
    if (dates && dates.length === 2) {
      const days = dates[1].diff(dates[0], 'days')
      setTotalPrice(dailyRate * days)
    } else {
      setTotalPrice(0)
    }
  }

  const handleReserveClick = () => {
    if (dates && dates.length === 2) {
      const reservationDetails = {
        dateRange: {
          start: dates[0].format('YYYY-MM-DD'),
          end: dates[1].format('YYYY-MM-DD'),
        },
        totalPrice,
      }
      onReserve(reservationDetails)

      resetForm()
    }
  }

  const resetForm = () => {
    setDates([])
    setTotalPrice(0)
  }

  return (
    <BookingContainer>
      <h2>Book Now</h2>
      <h2>${totalPrice.toFixed(2)} AUD total</h2>
      <RangePicker format="DD/MM/YYYY" onChange={onDateChange} />
      <div>
        <p>
          {dates.length === 2
            ? `${dailyRate.toFixed(2)} AUD x ${dates[1].diff(
                dates[0],
                'days'
              )} nights`
            : ''}
        </p>
        <p>Total</p>
        <h3>${totalPrice.toFixed(2)} AUD</h3>
      </div>
      <Button
        type="primary"
        size="large"
        disabled={totalPrice === 0}
        onClick={handleReserveClick}
      >
        Reserve
      </Button>
      <p>
        Price shown is the total trip price, including additional fees and
        taxes.
      </p>
    </BookingContainer>
  )
}

export default BookingComponent
