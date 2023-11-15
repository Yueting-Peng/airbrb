import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, List as AntList } from 'antd'

const List = styled(AntList)`
  @media (max-width: 768px) {
    .ant-list-items {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
  }
`
const ListItem = styled(AntList.Item)`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }
`
const ResponsiveButton = styled(Button)`
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 5px 10px;
    margin: 0 5px;
  }
`
const ResponsiveButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  @media (max-width: 768px) {
    align-self: flex-start;
    max-width: 350px;
    flex-direction: column;
    width: 100%;

    button {
      margin-bottom: 8px;
    }
  }
`
const BookingItemMeta = styled(List.Item.Meta)`
  @media (max-width: 768px) {
    .ant-list-item-meta-title {
      font-size: 16px;
      margin-bottom: 4px;
    }
    .ant-list-item-meta-description {
      font-size: 14px;
    }
  }
`

const BookingDetails = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 12px;
    p {
      margin: 5px 0;
    }
  }
`

const BookingRequests = ({ bookingData, history, onAccept, onDeny }) => {
  const [list, setList] = useState([])

  useEffect(() => {
    setList(bookingData)
  }, [bookingData])

  return (
    <List
      className="booking-requests-list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <ListItem>
          <div style={{ width: '100%' }}>
            <BookingItemMeta
              title={`Booking ID: ${item.id}`}
              description={`Customer email: ${item.owner}`}
            />
          </div>
          <BookingDetails>
            <p>
              Date range: {`${item.dateRange.start} to ${item.dateRange.end}`}
            </p>
            <p>Total price: ${item.totalPrice}</p>
          </BookingDetails>
          {history
            ? (
            <p>Status: {item.status}</p>
              )
            : (
            <ResponsiveButtonGroup>
              <ResponsiveButton
                key="accept"
                type="primary"
                ghost
                onClick={() => onAccept(item.id)}
              >
                Accept
              </ResponsiveButton>
              <ResponsiveButton
                key="deny"
                type="primary"
                onClick={() => onDeny(item.id)}
              >
                Deny
              </ResponsiveButton>
            </ResponsiveButtonGroup>
              )}
        </ListItem>
      )}
    />
  )
}

export default BookingRequests
