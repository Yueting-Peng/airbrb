import React, { useState } from 'react'
import { Space, Table, Image, message } from 'antd'
import StarRating from './StarRating'
import { EditOutlined, DeleteOutlined, StopOutlined, ArrowUpOutlined, BuildOutlined } from '@ant-design/icons'
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
  const manageBooking = (id) => {
    console.log('manage booking', id)
    navigate(`/hosting/manage-booking/${id}`)
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

  const expandedRowRender = (record) => {
    return (
      <Space size="large">
        <a onClick={() => manageBooking(record.id)}><BuildOutlined /> Manage Bookings</a>
        {record.published && (
          <a onClick={() => handleUnpublish(record.id)}><StopOutlined /> Unpublish</a>
        )}
        {!record.published && (
          <a onClick={() => handlePublish(record.id, record.availability)}>
            <ArrowUpOutlined /> Publish
          </a>
        )}
        <a onClick={() => handleEdit(record.id)}>
          <EditOutlined /> Edit
        </a>
        <a onClick={() => handleDelete(record.id)}>
          <DeleteOutlined /> Delete
        </a>
      </Space>
    )
  }

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
      title: 'Bath.',
      dataIndex: 'bathrooms',
      key: 'bathrooms',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating, record) => {
        const averageScore =
          record.reviews && record.reviews.length > 0
            ? record.reviews.reduce(
              (acc, review) => acc + (Number(review.score) || 0),
              0
            ) / record.reviews.length
            : 0
        return <StarRating rating={averageScore} />
      },
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
  ]

  return (
    <>
      {isLoading
        ? (
            'Loading'
          )
        : (
        <Table
          columns={columns}
          expandable={{
            expandedRowRender,
          }}
          dataSource={data}
        />
          )}
      <PublishListingModal
        isVisible={isPublishModalVisible}
        onDateRangeSubmit={handleModalSubmit}
        onClose={() => setPublishModalVisible(false)}
      />
    </>
  )
}

export default MyListingTable
