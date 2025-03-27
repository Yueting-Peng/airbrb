import React, { useState, useEffect } from 'react';
import { List, Card, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;

const Reservations = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5033/bookings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'pending':
        return 'processing';
      case 'declined':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>My Reservations</Title>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        dataSource={bookings}
        renderItem={(booking) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => navigate(`/detail/${booking.listingId}`)}
              title={`Reservation #${booking.id}`}
            >
              <p>Status: <Tag color={getStatusColor(booking.status)}>{booking.status}</Tag></p>
              <p>Total Price: ${booking.totalPrice}</p>
              <p>Check-in: {moment(booking.dateRange[0]).format('YYYY-MM-DD')}</p>
              <p>Check-out: {moment(booking.dateRange[1]).format('YYYY-MM-DD')}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Reservations; 