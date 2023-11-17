import React from 'react'
import { Descriptions } from 'antd'
import moment from 'moment'
import StarRating from './StarRating'

const ResponsiveDescriptions = ({
  address,
  price,
  propertyType,
  bedInfo,
  reviews,
}) => {
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.postcode}, ${address.country}`

  const lastSearchedDateRange = localStorage.getItem('lastSearchedDateRange')
  let priceDescription
  if (lastSearchedDateRange) {
    const [startDate, endDate] = lastSearchedDateRange.split(',')
    const days = moment(endDate).diff(moment(startDate), 'days')
    priceDescription = `$${price * days} per stay`

    // localStorage.removeItem('lastSearchedDateRange')
  } else {
    priceDescription = `$${price} per night`
  }
  const items = [
    {
      label: 'Price',
      children: priceDescription,
    },
    {
      label: 'Type',
      children: propertyType,
    },
    {
      label: 'Address',
      children: fullAddress,
    },
    {
      label: 'Bedrooms',
      children: bedInfo.bedrooms,
    },
    {
      label: 'Beds',
      children: bedInfo.beds,
    },
    {
      label: 'Bathrooms',
      children: bedInfo.bathrooms,
    },
    {
      label: 'Guest Ratings',
      children: <StarRating reviews={reviews} />,
    },
  ]

  return (
    <>
      <h2 id='property-information'>Property Information</h2>
      <Descriptions
        bordered
        column={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
      >
        {items.map((item, index) => (
          <Descriptions.Item
            key={index}
            label={item.label}
            span={item.span || 1}
          >
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  )
}

export default ResponsiveDescriptions
