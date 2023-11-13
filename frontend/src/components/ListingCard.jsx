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
import http from '../utils/request'

// Styled components
const StyledCard = styled(Card)`
  max-width: 100%;
  cursor: pointer;
`

const StyledImage = styled.img`
  width: 100%;
  border-radius: 10px;
`

const Content = styled.div`
  padding: 15px;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListingCard = ({ listing, onCardClick }) => {
  const [validImages, setValidImages] = React.useState([])

  React.useEffect(() => {
    http.get(`/listings/${listing.id}`).then((response) => {
      let imagesArray = []

      if (listing.thumbnail) {
        imagesArray.push(listing.thumbnail)
      }

      const images = response.listing.metadata.images

      if (Array.isArray(images)) {
        imagesArray = [...imagesArray, ...images]
      } else if (images != null) {
        imagesArray.push(images)
      }

      setValidImages(imagesArray)
    })
  }, [listing.id, listing.thumbnail])

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
        <HeartOutlined />
        <InfoRow>
          <span>
            <EnvironmentOutlined />{' '}
            {`${listing.address.city}, ${listing.address.country}`}
          </span>
          <span>
            <CalendarOutlined /> {listing.dates}
          </span>
        </InfoRow>
        <br />
        <InfoRow>
          <span>
            <DollarOutlined /> {listing.price} per night
          </span>
        </InfoRow>
        <br />
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
