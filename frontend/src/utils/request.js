const BASE_URL = 'http://localhost:5005'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      }
}

const handleResponse = (response) => {
  if (!response.ok) {
    return response
      .json()
      .then((data) => Promise.reject(new Error(data.error || 'Server error')))
  }
  return response.json()
}

const get = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: getHeaders(),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error(`GET request failed: ${url}`, error)
    throw error
  }
}

const post = async (url, data) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: getHeaders(),
    }

    if (data !== null && data !== undefined) {
      requestOptions.body = JSON.stringify(data)
    }
    const response = await fetch(`${BASE_URL}${url}`, requestOptions)
    return await handleResponse(response)
  } catch (error) {
    console.error('POST request failed:', error)
    throw error
  }
}

const put = async (url, data = {}) => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: getHeaders(),
    }
    if (Object.keys(data).length > 0) {
      requestOptions.body = JSON.stringify(data)
    }
    const response = await fetch(`${BASE_URL}${url}`, requestOptions)
    return await handleResponse(response)
  } catch (error) {
    console.error('PUT request failed:', error)
    throw error
  }
}

const deleteRequest = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('DELETE request failed:', error)
    throw error
  }
}

const http = {
  get,
  post,
  put,
  deleteRequest,
}

export default http
