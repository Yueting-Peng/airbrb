import React, { useEffect, useState } from 'react';
import { List, Tag } from 'antd';
import { fetchUserBookings } from '../api/bookings';

const Reservations = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await fetchUserBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    getBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'green';
      case 'pending':
        return 'gold';
      case 'declined':
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={bookings}
      renderItem={(booking) => (
        <List.Item>
          <List.Item.Meta
            title={booking.listingTitle}
            description={
              <>
                <p>Total Price: ${booking.totalPrice}</p>
                <p>Check-in: {booking.dateRange.start}</p>
                <p>Check-out: {booking.dateRange.end}</p>
                <Tag color={getStatusColor(booking.status)}>
                  {booking.status}
                </Tag>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default Reservations; 