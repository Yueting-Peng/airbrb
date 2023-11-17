import React, { useState, useEffect } from 'react'
import { DatePicker, Button, Modal } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

const { RangePicker } = DatePicker

const BookingContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
`

const BookingComponent = ({ dailyRate, onReserve, availability }) => {
  const [dates, setDates] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const onDateChange = (dates) => {
    const validDates = dates || []
    setDates(validDates)
    calculateTotal(validDates)
  }

  const calculateTotal = (dates) => {
    if (dates && dates.length === 2) {
      const days = dates[1].diff(dates[0], 'days')
      setTotalPrice(dailyRate * days)
    } else {
      setTotalPrice(0)
    }
  }
  const disabledDate = (current) => {
    if (current && current < moment().startOf('day')) {
      return true
    }

    return !availability.some((avail) => {
      const start = moment(avail.start)
      const end = moment(avail.end).endOf('day')
      return current >= start && current <= end
    })
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

      Modal.confirm({
        title: 'Confirm Reservation',
        content: `Do you want to reserve from ${reservationDetails.dateRange.start} to ${reservationDetails.dateRange.end} for a total price of $${totalPrice}?`,
        okType: 'danger',
        onOk () {
          onReserve(reservationDetails);
          resetForm();
        },
        onCancel () {
          console.log('Reservation cancelled');
        },
      });
    }
  }

  const resetForm = () => {
    setDates([])
    setTotalPrice(0)
  }

  useEffect(() => {
    const lastSearchedDateRange = localStorage.getItem('lastSearchedDateRange')
    if (lastSearchedDateRange) {
      const [start, end] = lastSearchedDateRange.split(',')
      setDates([moment(start), moment(end)])
      calculateTotal([moment(start), moment(end)])
    }
  }, [])

  return (
    <BookingContainer>
      <h2>Book Now</h2>
      <h2>${totalPrice.toFixed(2)} AUD total</h2>
      <RangePicker
        format="DD/MM/YYYY"
        onChange={onDateChange}
        disabledDate={disabledDate}
        value={dates.length === 2 ? [dates[0], dates[1]] : null}
      />
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
