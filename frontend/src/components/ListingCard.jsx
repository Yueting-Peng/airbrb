import React from 'react'
import { Carousel, Card } from 'antd'
import {
  HeartOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  StarFilled,
} from '@ant-design/icons'

const ListingCard = ({ images, listing, onCardClick }) => {
  const validImages = Array.isArray(images) ? images : []
  return (
    <div onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <Card hoverable>
        <Carousel autoplay>
          {validImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Listing ${index + 1}`}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </Carousel>
        <div style={{ padding: '15px' }}>
          <h3>{listing.title}</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <HeartOutlined />
            <span>
              <EnvironmentOutlined /> {listing.location}
            </span>
            <span>
              <CalendarOutlined /> {listing.dates}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              <DollarOutlined /> {listing.price}
            </span>
            <span>
              <StarFilled style={{ color: '#ffbc02' }} />
              {listing.rating}
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ListingCard
