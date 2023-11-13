import React, { useState, useEffect } from 'react'
import { Modal, DatePicker, Button, Space } from 'antd'

const { RangePicker } = DatePicker

const PublishListingModal = ({ isVisible, onClose, onDateRangeSubmit }) => {
  const [availability, setAvailability] = useState([])
  useEffect(() => {
    if (isVisible) {
      setAvailability([]);
    }
  }, [isVisible]);

  const handleAddRange = (dates) => {
    if (dates) {
      const newRange = {
        start: dates[0].format('YYYY-MM-DD'),
        end: dates[1].format('YYYY-MM-DD'),
      }
      setAvailability([...availability, newRange])
    }
  }

  const handleSubmit = () => {
    onDateRangeSubmit(availability)
    setAvailability([])
    onClose()
  }

  return (
    <Modal
      title="Publish Listing"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Publish
        </Button>,
      ]}
    >
      <h4>Please choose one or more availability date range(s)</h4>
      <Space direction="vertical" size="large">
        <RangePicker format="YYYY-MM-DD" onChange={handleAddRange} />
        {availability.map((range, index) => (
          <div key={index}>
            {range.start} to {range.end}
          </div>
        ))}
      </Space>
    </Modal>
  )
}

export default PublishListingModal
