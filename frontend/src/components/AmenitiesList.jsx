import React from 'react'
import { List } from 'antd'
import { Window, Wifi } from 'react-bootstrap-icons'
import { FaSwimmingPool, FaParking, FaTv, FaSnowflake } from 'react-icons/fa'
import { MdLocalLaundryService } from 'react-icons/md'
import styled from 'styled-components'

const AmenityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
`
const StyledListItem = styled(List.Item)`
  text-decoration: ${(props) => (props.available ? 'none' : 'line-through')};
`

const amenitiesIcons = {
  wifi: Wifi,
  tv: FaTv,
  kitchen: Window, // use the corrected import here
  washingMachine: MdLocalLaundryService,
  airConditioning: FaSnowflake,
  swimmingPool: FaSwimmingPool,
  parking: FaParking,
}

const AmenityItem = ({ amenity, available }) => {
  const IconComponent = amenitiesIcons[amenity]

  const formatAmenity = (str) => {
    return (
      str
        // Insert space before capital letters and trim
        .replace(/([A-Z])/g, ' $1')
        .trim()
        // Capitalize the first letter of each word
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
  }
  return (
    <StyledListItem available={available}>
      <List.Item.Meta
        avatar={IconComponent ? <IconComponent size={24} /> : null}
        title={formatAmenity(amenity)} // Add space before capital letters
      />
    </StyledListItem>
  )
}

const AmenitiesComponent = ({ amenities }) => {
  const amenitiesList = Object.entries(amenities).map(([key, value]) => ({
    amenity: key,
    available: value,
  }))

  return (
    <AmenityContainer>
      <h2>What this place offers</h2>
      <List
        itemLayout="horizontal"
        dataSource={amenitiesList}
        renderItem={({ amenity, available }) => (
          <AmenityItem amenity={amenity} available={available} />
        )}
      />
    </AmenityContainer>
  )
}

export default AmenitiesComponent
