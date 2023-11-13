import React from 'react'
import styled from 'styled-components'
import { ValueToListingContent } from './ListingComponent.js'
import { fileToDataUrl } from '../utils/helpers.js'
import useHttp from '../utils/useHttp'
import ListingForm from './ListingForm.jsx'
import { message } from 'antd'
import { HouseAdd } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const CtrateListingDiv = styled.div`
  width: 85%;
  max-width: 700px;
  color: #574141;
  margin-left: 40px;
  @media (max-width: 750px) {
    margin-left: 10px;
  }
`
const CreateListing = () => {
  const navigate = useNavigate()
  const { isLoading, error, data, request } = useHttp()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)

    ValueToListingContent(values, fileToDataUrl)
      .then((listingBody) => {
        console.log(listingBody)
        request('post', '/listings/new', listingBody)
      })
      .catch((error) => {
        console.error('Error processing the form values: ', error)
      })
  }
  React.useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message,
      })
    }
    if (data) {
      message.open({
        type: 'success',
        content: 'Created a listing successfully!',
      })
      navigate('/hosting')
    }
  }, [error, data, navigate])

  return (
    <CtrateListingDiv>
      <h2>
        <HouseAdd />
        &nbsp;&nbsp;Create a new listing
      </h2>
      <ListingForm onFinish={onFinish} isLoading={isLoading} />
    </CtrateListingDiv>
  )
}

export default CreateListing
