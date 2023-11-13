import React, { useState, useEffect } from 'react'
import { ValueToListingContent } from './ListingComponent.js'
import { useParams, useNavigate } from 'react-router-dom'
import useHttp from '../utils/useHttp'
import { message } from 'antd'
import ListingForm from './ListingForm'
import http from '../utils/request'
import { fileToDataUrl } from '../utils/helpers.js'

const EditListing = () => {
  const navigate = useNavigate()
  const [listingDetails, setListingDetails] = useState(null)
  const params = useParams()
  const { isLoading, error, data, request } = useHttp()
  const handleFormSubmit = (formData) => {
    console.log(formData.images)
    ValueToListingContent(formData, fileToDataUrl)
      .then((listingBody) => {
        console.log(listingBody)
        request('put', `/listings/${params.listingId}`, listingBody)
      })
      .then(navigate('/hosting'))
      .catch((error) => {
        console.error('Error processing the form values: ', error)
      })
  }
  useEffect(() => {
    http
      .get(`/listings/${params.listingId}`)
      .then((res) => {
        return res.listing
      })
      .then((response) => {
        const { title, price, address, metadata } = response
        const { propertyType, bedInfo, otherInfo, images } = metadata
        let thumbnailList = []
        if (typeof response.thumbnail === 'string') {
          thumbnailList = [
            {
              uid: '-1',
              name: 'thumbnail.png',
              status: 'done',
              thumbUrl: response.thumbnail,
            },
          ]
        }

        const imageList = Array.isArray(images)
          ? images.map((image, index) => ({
            uid: String(-index - 1),
            name: `image_${index}.png`,
            status: 'done',
            thumbUrl: image,
          }))
          : []
        console.log(imageList)
        const amenities = []
        for (const [key, value] of Object.entries(otherInfo)) {
          if (value === true) {
            amenities.push(key)
          }
        }
        return {
          title,
          price,
          ...address,
          propertyType,
          ...bedInfo,
          amenities,
          thumbnail: thumbnailList,
          images: imageList,
        }
      })
      .then((res) => setListingDetails(res))
      .catch((error) => {
        message.error('Error fetching listing details')
        console.error(error)
      })
  }, [params.listingId, request])

  useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message,
      })
    }
    if (data) {
      message.open({
        type: 'success',
        content: 'Edited a listing successfully!',
      })
    }
  }, [error, data])

  return (
    <>
      <h2>Edit Listing: {listingDetails && listingDetails.title}</h2>
      {!isLoading && (
        <ListingForm
          initialValues={listingDetails}
          onFinish={handleFormSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default EditListing
