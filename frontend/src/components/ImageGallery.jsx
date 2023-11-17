import React, { useState } from 'react'
import { Carousel, Modal } from 'antd'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ThumbnailWrapper = styled.div`
  grid-column: span 1 / auto;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:first-child {
    grid-column: span 2 / auto;
    grid-row: span 2 / auto;
  }
  &:nth-child(n + 6) {
    display: none;
  }
`

const ImageGallery = ({ images }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const showModal = (index) => {
    setCurrentImage(index)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <GalleryContainer>
        {images.slice(0, 5).map((img, index) => (
          <ThumbnailWrapper key={index} onClick={() => showModal(index)}>
            <StyledImage src={img} alt={`Image ${index}`} />
          </ThumbnailWrapper>
        ))}
      </GalleryContainer>
      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <Carousel initialSlide={currentImage} adaptiveHeight>
          {images.map((img, index) => (
            <div key={index}>
              <StyledImage src={img} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  )
}

export default ImageGallery
