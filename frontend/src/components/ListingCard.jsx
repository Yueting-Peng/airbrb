import React from 'react'
import { Carousel, Card } from 'antd'
import styled from 'styled-components'
import {
  HeartOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  StarOutlined,
} from '@ant-design/icons'
import StarRating from './StarRating'

// Styled components
const StatusTag = styled.span`
  background-color: #e0e0e0;
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9em;
  position: absolute;
  left: 30px;
  top: 30px;
`

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
const ReviewRow = styled.div`
  display: flex;
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
  const uniqueStatuses = [...new Set(listing.status)]

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
        {uniqueStatuses &&
          uniqueStatuses.map((status, index) => (
            <StatusTag key={index}>{status.toUpperCase()}</StatusTag>
          ))}
        <InfoRow>
          <h3>{listing.title}</h3>{' '}
          <ReviewRow>
            <StarRating reviews={listing.reviews} hideRate={true} />
          </ReviewRow>
        </InfoRow>

        <StyledHeartOutlined />
        <InfoRow>
          <span>
            <EnvironmentOutlined />{' '}
            {`${listing.address.city}, ${listing.address.country}`}
          </span>
        </InfoRow>
        <InfoRow>
          <span>
            <DollarOutlined /> {listing.price} per night
          </span>
        </InfoRow>

        <ReviewRow>
          {' '}
          <span>
            <StarOutlined /> Total reviews:{' '}
            {Array.isArray(listing.reviews) ? listing.reviews.length : 0}
          </span>
        </ReviewRow>
      </Content>
    </StyledCard>
  )
}

export default ListingCard
