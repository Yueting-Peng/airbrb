import React, { useState } from 'react'
import { Input, Button, Slider, DatePicker, Radio, Modal, Tabs } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

const StyledSearchOutlined = styled(SearchOutlined)`
  font-size: 16px;
  cursor: pointer;
`

const SearchComponent = () => {
  const navigate = useNavigate()
  const INITIAL_SEARCH_TEXT = ''
  const INITIAL_BEDROOMS = [1, 4]
  const INITIAL_DATE_RANGE = []
  const INITIAL_PRICE_RANGE = [50, 400]
  const INITIAL_REVIEW_RATING = 'highToLow'

  const [activeTab, setActiveTab] = useState('TitleOrCity')
  const [searchText, setSearchText] = useState(INITIAL_SEARCH_TEXT)
  const [bedrooms, setBedrooms] = useState(INITIAL_BEDROOMS)
  const [dateRange, setDateRange] = useState(INITIAL_DATE_RANGE)
  const [priceRange, setPriceRange] = useState(INITIAL_PRICE_RANGE)
  const [reviewRating, setReviewRating] = useState(INITIAL_REVIEW_RATING)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onDateChange = (dates) => {
    if (!dates || dates.length === 0) {
      return
    }
    setDateRange(dates)
  }

  const handleSearch = () => {
    const queryParams = new URLSearchParams()
    switch (activeTab) {
      case 'TitleOrCity':
        console.log(searchText)
        queryParams.append('search', searchText)
        break
      case 'BedroomRange':
        queryParams.append('bedrooms', bedrooms.join(','))
        break
      case 'DateRange':
        queryParams.append(
          'dateRange',
          dateRange.map((date) => date.toISOString()).join(',')
        )
        break
      case 'PriceRange':
        queryParams.append('priceRange', priceRange.join(','))
        break
      case 'ReviewRating':
        queryParams.append('reviewRating', reviewRating)
        break
      default:
        console.log('Unknown search type')
    }
    navigate(`/search?${queryParams.toString()}`)

    setIsModalVisible(false)
  }

  const showModal = () => {
    setIsModalVisible(true)
    setSearchText(INITIAL_SEARCH_TEXT)
    setBedrooms(INITIAL_BEDROOMS)
    setDateRange(INITIAL_DATE_RANGE)
    setPriceRange(INITIAL_PRICE_RANGE)
    setReviewRating(INITIAL_REVIEW_RATING)
  }
  const tabItems = [
    {
      label: 'Title or City',
      key: 'TitleOrCity',
      children: (
        <Input
          placeholder="Search by title or city"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      ),
    },
    {
      label: 'Bedroom range',
      key: 'BedroomRange',
      children: (
        <Slider
          range
          min={1}
          max={10}
          value={bedrooms}
          onChange={setBedrooms}
        />
      ),
    },
    {
      label: 'Date Range',
      key: 'DateRange',
      children: (
        <RangePicker
          value={dateRange.length ? dateRange : null}
          onChange={onDateChange}
        />
      ),
    },
    {
      label: 'Price Range',
      key: 'PriceRange',
      children: (
        <Slider
          range
          min={50}
          max={1000}
          value={priceRange}
          onChange={setPriceRange}
        />
      ),
    },
    {
      label: 'Review Rating',
      key: 'ReviewRating',
      children: (
        <Radio.Group
          value={reviewRating}
          onChange={(e) => setReviewRating(e.target.value)}
        >
          <Radio.Button value="highToLow">High to Low</Radio.Button>
          <Radio.Button value="lowToHigh">Low to High</Radio.Button>
        </Radio.Group>
      ),
    },
  ]

  return (
    <div>
      <div onClick={showModal}><StyledSearchOutlined /><span> Search Filters</span></div>
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
        <Tabs
          defaultActiveKey="TitleOrCity"
          onChange={(key) => setActiveTab(key)}
          items={tabItems}
        />
      </Modal>
    </div>
  )
}

export default SearchComponent
