import React, { useState } from 'react'
import { List, Rate, Typography, Pagination } from 'antd'
import { StarFilled } from '@ant-design/icons'

const { Title } = Typography

const ReviewsComponent = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3 // Number of reviews per page

  const averageScore =
    Array.isArray(reviews) && reviews.length > 0
      ? reviews.reduce((acc, review) => acc + (Number(review.score) || 0), 0) /
        reviews.length
      : 0

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize
    return reviews.slice(startIndex, startIndex + pageSize)
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <Title level={3}>
        <StarFilled /> {averageScore.toFixed(2)} · {reviews.length} reviews
      </Title>
      <List
        dataSource={paginatedData()}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Rate disabled defaultValue={item.score} />}
              description={item.comment}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        onChange={onPageChange}
        pageSize={pageSize}
        total={reviews.length}
      />
    </div>
  )
}

export default ReviewsComponent
