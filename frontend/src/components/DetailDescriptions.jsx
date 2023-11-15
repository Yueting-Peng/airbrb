import React from 'react'
import { Descriptions } from 'antd'

const ResponsiveDescriptions = ({
  address,
  price,
  priceType,
  propertyType,
  bedInfo,
}) => {
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.postcode}, ${address.country}`
  const items = [
    {
      label: 'Price',
      children:
        priceType === 'perStay' ? `$${price} per stay` : `$${price} per night`,
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
  ]

  return (
    <>
    <h2>Property Information</h2>
    <Descriptions
      bordered
      column={{
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
    >
      {items.map((item, index) => (
        <Descriptions.Item key={index} label={item.label} span={item.span || 1}>
          {item.children}
        </Descriptions.Item>
      ))}
    </Descriptions>
    </>
  )
}

export default ResponsiveDescriptions
