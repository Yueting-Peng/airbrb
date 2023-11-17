import React, { useState, useMemo } from 'react'
import { Rate, Tooltip, Modal, List } from 'antd'
import styled from 'styled-components'
import { StarFilled } from '@ant-design/icons'

const RatingBreakdown = styled.div`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RatingValue = styled.span`
  margin-left: 8px;
`
const StarRating = ({ reviews, hideRate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedStar, setSelectedStar] = useState(null)

  const groupedReviews = useMemo(() => {
    const initial = { 1: [], 2: [], 3: [], 4: [], 5: [] }
    return reviews.reduce((acc, review) => {
      acc[review.score].push(review)
      return acc
    }, initial)
  }, [reviews])

  const totalRatings = reviews.length

  const averageRating = useMemo(() => {
    return reviews.reduce((acc, { score }) => acc + score, 0) / totalRatings
  }, [reviews])

  const handleReviewDisplay = (star) => {
    setSelectedStar(star)
    setIsModalVisible(true)
  }

  const tooltipContent = useMemo(() => {
    return (
      <div>
        {Object.keys(groupedReviews).map((star) => {
          const count = groupedReviews[star].length
          const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0
          return (
            <RatingBreakdown
              key={star}
              onClick={() => handleReviewDisplay(star)}
            >
              {star} star: {percentage.toFixed(1)}% ({count} votes)
            </RatingBreakdown>
          )
        })}
      </div>
    )
  }, [groupedReviews, totalRatings, handleReviewDisplay])

  return (
    <>
      <Tooltip title={tooltipContent}>
        <RatingWrapper>
          {!hideRate
            ? (
            <Rate disabled allowHalf defaultValue={averageRating} />
              )
            : (
            <StarFilled />
              )}
          <RatingValue>
            {isNaN(averageRating) ? 0 : averageRating.toFixed(1)}
          </RatingValue>
        </RatingWrapper>
      </Tooltip>
      <Modal
        title={`Reviews for ${selectedStar} Star${selectedStar > 1 ? 's' : ''}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={groupedReviews[selectedStar]}
          renderItem={(review) => (
            <List.Item key={review.id}>
              <List.Item.Meta
                title={`Rating: ${review.score}`}
                description={review.comment}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  )
}

export default StarRating
