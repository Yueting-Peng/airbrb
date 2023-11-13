export const ValueToListingContent = (values, fileToDataUrl) => {
  const thumbnailPromise =
    values.thumbnail && values.thumbnail.length > 0
      ? values.thumbnail[0].originFileObj
        ? fileToDataUrl(values.thumbnail[0].originFileObj)
        : Promise.resolve(values.thumbnail[0].thumbUrl || '')
      : Promise.resolve('')

  const imagesPromises =
      values.images && values.images.length > 0
        ? Promise.all(
          values.images.map((image) =>
            image.originFileObj
              ? fileToDataUrl(image.originFileObj)
              : Promise.resolve(image.thumbUrl || '')
          )
        )
        : Promise.resolve([]);

  return Promise.all([thumbnailPromise, imagesPromises]).then(
    ([thumbnailBase64, imagesBase64]) => {
      return {
        title: values.title,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          postcode: values.postcode,
          country: values.country,
        },
        price: values.price,
        thumbnail: thumbnailBase64,

        metadata: {
          images: imagesBase64,
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
            kitchen: values.amenities.includes('kitchen'),
            washingMachine: values.amenities.includes('washingMachine'),
            airConditioning: values.amenities.includes('airConditioning'),
            swimmingPool: values.amenities.includes('swimmingPool'),
            parking: values.amenities.includes('parking'),
          },
        },
      }
    }
  )
}
