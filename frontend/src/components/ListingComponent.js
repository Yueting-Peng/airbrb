export const ValueToListingContent = (values, fileToDataUrl) => {
  const thumbnailPromise =
    values.thumbnail && values.thumbnail.length > 0
      ? fileToDataUrl(values.thumbnail[0].originFileObj)
      : Promise.resolve('')

  return thumbnailPromise.then((thumbnailBase64) => {
    return {
      title: values.title,
      address: {
        street: values.street,
        suburb: values.suburb,
        city: values.city,
        state: values.state,
        postcode: values.postcode,
        country: values.country,
      },
      price: values.price,
      thumbnail: thumbnailBase64,
      metadata: {
        propertyType: values.propertyType,
        bedInfo: {
          guests: values.guests,
          bedrooms: values.bedrooms,
          beds: values.beds,
          bathrooms: values.bathrooms,
        },
        otherInfo: {
          wifi: values.amenities.includes('wifi'),
          tv: values.amenities.includes('tv'),
          airConditioning: values.amenities.includes('airConditioning'),
          parking: values.amenities.includes('parking'),
        },
        images: values.images,
      },
    }
  })
}
