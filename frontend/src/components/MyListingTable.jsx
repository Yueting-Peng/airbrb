import React, { useState } from 'react'
import { Space, Table, Image, message } from 'antd'
import StarRating from './StarRating'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useHttp from '../utils/useHttp'
import { useNavigate } from 'react-router-dom'
import PublishListingModal from './PublishListingModal'
import http from '../utils/request'

const MyListingTable = ({ data, refreshListings }) => {
  const [isPublishModalVisible, setPublishModalVisible] = useState(false)
  const [currentListingId, setCurrentListingId] = useState(null)
  const navigate = useNavigate()
  const { isLoading, error, fetcheddata, request } = useHttp()
  // console.log(data.reviews)
  const handleEdit = (id) => {
    console.log('Edit:', id)
    navigate(`/hosting/edit/${id}`)
  }

  const handleDelete = (id) => {
    const isConfirmed = confirm('Are you sure you want to delete the listing?')
    if (!isConfirmed) return
    console.log('Delete:', id)
    request('deleteRequest', `/listings/${id}`).then(() => refreshListings())
  }
  const handleUnpublish = (id) => {
    console.log(`unpublish${id}`)
    http.put(`/listings/unpublish/${id}`).then(() => refreshListings())
  }
  const handlePublish = (id, availability) => {
    console.log(availability)
    if (Array.isArray(availability) && availability.length === 0) {
      console.log('ji')
      message.open({
        type: 'warning',
        content: 'No avalible date range yet! Please set it first.',
      })
      setCurrentListingId(id)
      setPublishModalVisible(true)
    } else {
      console.log(`publish ${id}`)
      request('put', `/listings/publish/${id}`).then(() => refreshListings())
    }
  }
  const handleModalSubmit = (dateRange) => {
    setPublishModalVisible(false)

    console.log(
      `Publish listing ${currentListingId} with date range: `,
      dateRange
    )
    request('put', `/listings/publish/${currentListingId}`, {
      availability: dateRange,
    }).then(() => refreshListings())
  }

  React.useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'failed',
      })
    }
    // if (data) {
    //   console.log('Airbnb data.listings:', data)
    // }
  }, [error, fetcheddata])

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => <Image src={thumbnail} width={50} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'propertyType',
      key: 'propertyType',
    },
    {
      title: 'Status',
      dataIndex: 'published',
      key: 'published',
      render: (published) => (published ? 'Listed' : 'Unlisted'),
    },
    {
      title: 'Beds',
      dataIndex: 'beds',
      key: 'beds',
    },
    {
      title: 'Bathrooms',
      dataIndex: 'bathrooms',
      key: 'bathrooms',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <StarRating rating={rating} />,
    },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      key: 'reviews',
      render: (reviews) => (Array.isArray(reviews) ? reviews.length : 0),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.published && (
            <a onClick={() => handleUnpublish(record.id)}>Unpublish</a>
          )}
          {!record.published && (
            <a onClick={() => handlePublish(record.id, record.availability)}>
              Publish
            </a>
          )}
          <a onClick={() => handleEdit(record.id)}>
            <EditOutlined />
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ]

  return (
    <>
      {isLoading ? 'Loading' : <Table columns={columns} dataSource={data} />}
      <PublishListingModal
        isVisible={isPublishModalVisible}
        onDateRangeSubmit={handleModalSubmit}
        onClose={() => setPublishModalVisible(false)}
      />
    </>
  )
}

export default MyListingTable
