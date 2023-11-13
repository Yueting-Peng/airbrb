import React, { useState } from 'react'
import { Input, Button, Slider, DatePicker, Radio, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { RangePicker } = DatePicker
const StyledSearchOutlined = styled(SearchOutlined)`
  font-size: 16px;
  cursor: pointer;
`

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('')
  const [bedrooms, setBedrooms] = useState([1, 5])
  const [dateRange, setDateRange] = useState([])
  const [priceRange, setPriceRange] = useState([50, 500])
  const [reviewRating, setReviewRating] = useState('highToLow')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      return
    }
    setDateRange(dates)
  }

  const handleSearch = () => {
    setIsModalVisible(false) // 关闭模态框
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  return (
    <div>
      <StyledSearchOutlined onClick={showModal} />
      <Modal
        key={isModalVisible ? 'modal-open' : 'modal-closed'}
        title="Search Filters"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleSearch}>
            Search Listings
          </Button>,
        ]}
      >
        <h4>Title or City:</h4>
        <Input
          placeholder="Search by title or city"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <br />
        <br />
        <h4>Number of Bedrooms:</h4>
        <Slider
          range
          min={1}
          max={10}
          value={bedrooms}
          onChange={setBedrooms}
        />
        <br />
        <h4>Date Range:</h4>
        <RangePicker
          value={dateRange.length ? dateRange : null}
          onChange={onDateChange}
        />
        <br />
        <br />
        <h4>Price Range:</h4>
        <Slider
          range
          min={50}
          max={1000}
          value={priceRange}
          onChange={setPriceRange}
        />
        <br />
        <h4>Review Rating:</h4>
        <Radio.Group
          value={reviewRating}
          onChange={(e) => setReviewRating(e.target.value)}
        >
          <Radio.Button value="highToLow">High to Low</Radio.Button>
          <Radio.Button value="lowToHigh">Low to High</Radio.Button>
        </Radio.Group>
      </Modal>
    </div>
  )
}

export default SearchComponent
