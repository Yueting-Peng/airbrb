import React from 'react'
import { Carousel, Card } from 'antd'
import styled from 'styled-components'
import {
  HeartOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  StarFilled,
} from '@ant-design/icons'

// Styled components
const StyledCard = styled(Card)`
  max-width: 100%;
  cursor: pointer;
  height: fit-content;
  position: relative;
`

const StyledImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
`

const Content = styled.div`
  padding: 15px;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`
const StyledHeartOutlined = styled(HeartOutlined)`
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
  color: white;
  font-size: large;
`

const ListingCard = ({ listing, onCardClick }) => {
  const validImages = listing.metadata.images || []
  if (listing.thumbnail) {
    validImages.unshift(listing.thumbnail)
  }

  return (
    <StyledCard hoverable onClick={onCardClick}>
      <Carousel autoplay>
        {validImages.map((image, index) => (
          <div key={index}>
            <StyledImage src={image} alt={`Listing ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <Content>
        <h3>{listing.title}</h3>
        <StyledHeartOutlined />
        <InfoRow>
          <span>
            <EnvironmentOutlined />{' '}
            {`${listing.address.city}, ${listing.address.country}`}
          </span>
          <span>
            <CalendarOutlined /> {listing.dates}
          </span>
        </InfoRow>
        <InfoRow>
          <span>
            <DollarOutlined /> {listing.price} per night
          </span>
        </InfoRow>
        <InfoRow>
          {' '}
          <span>
            <StarFilled /> Total reviews:{' '}
            {Array.isArray(listing.reviews) ? listing.reviews.length : 0}
          </span>
        </InfoRow>
      </Content>
    </StyledCard>
  )
}

export default ListingCard
