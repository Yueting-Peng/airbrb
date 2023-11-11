import { useState } from 'react'
import http from './request'

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const request = async (requestType, url, requestData = null) => {
    setIsLoading(true)
    try {
      const response = await http[requestType](url, requestData)
      setData(response)
      setIsLoading(false)
    } catch (err) {
      setError(err)
      setIsLoading(false)
    }
  }

  return { isLoading, error, data, request }
}

export default useHttp
