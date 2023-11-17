import React, { useState } from 'react'
import { Space, Table, Image, message, Modal } from 'antd'
import StarRating from './StarRating'
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  ArrowUpOutlined,
  BuildOutlined,
} from '@ant-design/icons'
import useHttp from '../utils/useHttp'
import { useNavigate } from 'react-router-dom'
import PublishListingModal from './PublishListingModal'
import http from '../utils/request'
import styled from 'styled-components'

const ResponsiveTableLg = styled(Table)`
  @media (min-width: 992px) {
    display: none;
  }
`
const ResponsiveTableMd = styled(Table)`
  @media (min-width: 768px) {
    display: none;
  }
`

const SmallScreenRating = styled.div`
  display: none;
  @media (max-width: 1300px) {
    display: block;
  }
`

const LargeScreenRating = styled.div`
  display: block;
  @media (max-width: 1300px) {
    display: none;
  }
`
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
    Modal.confirm({
      title: 'Delete a listing',
      content: 'Are you sure you want to delete the listing?',
      okType: 'danger',
      onOk: async () => {
        try {
          request('deleteRequest', `/listings/${id}`).then(() =>
            refreshListings()
          )
        } catch (error) {
          message.error(error.message || 'delete failed')
        }
      },
      onCancel () {
        console.log('Cancel delete')
      },
    })
    console.log('Delete:', id)
  }
  const handleUnpublish = (id) => {
    Modal.confirm({
      title: 'Unpublish a listing',
      content: 'Are you sure you want to unpublish the listing?',
      okType: 'danger',
      onOk: async () => {
        try {
          http.put(`/listings/unpublish/${id}`).then(() => refreshListings())
        } catch (error) {
          message.error(error.message || 'unpublish failed')
        }
      },
      onCancel () {
        console.log('Cancel unpublish')
      },
    })
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
      <>
        <ResponsiveTableLg
          columns={subTableColumns1}
          dataSource={[record]}
          pagination={false}
          showHeader={true}
        />
        <ResponsiveTableMd
          columns={subTableColumns2}
          dataSource={[record]}
          pagination={false}
          showHeader={true}
        />
        <Space size="large">
          <a onClick={() => manageBooking(record.id)}>
            <BuildOutlined /> Manage Bookings
          </a>
          {record.published && (
            <a onClick={() => handleUnpublish(record.id)}>
              <StopOutlined /> Unpublish
            </a>
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
      </>
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
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'published',
      key: 'published',
      render: (published) => (published ? 'Listed' : 'Unlisted'),
      responsive: ['lg'],
    },
    {
      title: 'Beds',
      dataIndex: 'beds',
      key: 'beds',
      responsive: ['lg'],
    },
    {
      title: 'Bath.',
      dataIndex: 'bathrooms',
      key: 'bathrooms',
      responsive: ['lg'],
    },
    {
      title: 'Rating',
      dataIndex: 'reviews',
      key: 'rating',
      render: (reviews) => (
        <>
          <SmallScreenRating>
            <StarRating reviews={reviews} hideRate={true} />
          </SmallScreenRating>
          <LargeScreenRating>
            <StarRating reviews={reviews} />
          </LargeScreenRating>
        </>
      ),
      responsive: ['lg'],
    },
    {
      title: 'Reviews',
      dataIndex: 'reviews',
      key: 'reviews',
      render: (reviews) => (Array.isArray(reviews) ? reviews.length : 0),
      responsive: ['md'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      responsive: ['md'],
    },
  ]

  const subTableColumns1 = [
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
      dataIndex: 'reviews',
      key: 'rating',
      render: (reviews) => <StarRating reviews={reviews} hideRate={true} />,
    },
  ]
  const subTableColumns2 = [
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
      title: 'Type',
      dataIndex: 'propertyType',
      key: 'propertyType',
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
