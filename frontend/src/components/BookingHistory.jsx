import React, { useState } from 'react'
import { List, Button, Modal, Rate, Input, Form, message } from 'antd'
import styled from 'styled-components'
import http from '../utils/request'
import { useNavigate } from 'react-router-dom'

const StyledList = styled(List)`
  background-color: #fafafa;
  padding: 20px;
  padding-right: 30px;
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 5px;
  }
`
const BookingHistory = ({ bookings }) => {
  const navigate = useNavigate()
  console.log(bookings)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const showModal = (item) => {
    setSelectedItem(item)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const submitReview = (values, id, listingId) => {
    if (!id || !listingId) {
      console.log('No selected item or listing id.')
      return
    }
    const dataToSend = {
      review: {
        score: values.score,
        comment: values.comment,
      },
    }

    http
      .put(`/listings/${listingId}/review/${id}`, dataToSend)
      .then(
        message.open({
          type: 'success',
          content: 'Commented successfully',
        }),
        navigate(0))
      .catch((error) => {
        message.open({
          type: 'error',
          content: error.message || 'failed to leave a review!',
        })
      })
    setIsModalVisible(false)
  }

  return (
    <>
      <StyledList
        itemLayout="horizontal"
        dataSource={bookings}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={`review-${item.id}`}
                type="primary"
                ghost
                onClick={() => showModal(item)}
              >
                Leave a review
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`Booking ID: ${item.id}`}
              description={`Date Range: ${item.dateRange.start} to ${item.dateRange.end},  Total Price: ${item.totalPrice}`}
            />
          </List.Item>
        )}
      />
      <ReviewModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        submitReview={submitReview}
        selectedItem={selectedItem}
      />
    </>
  )
}

const ReviewModal = ({
  isModalVisible,
  handleCancel,
  submitReview,
  selectedItem,
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Leave a Review"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        onFinish={(values) =>
          submitReview(values, selectedItem.id, selectedItem.listingId)
        }
      >
        <Form.Item
          name="score"
          label="Score"
          rules={[{ required: true, message: 'Please select a score' }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Comment"
          rules={[{ required: true, message: 'Please add a comment' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BookingHistory
