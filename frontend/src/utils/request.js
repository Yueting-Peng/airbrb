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
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleResponse(response)
}

const post = async (url, data) => {
  console.log(data)
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
  }

  if (data !== null && data !== undefined) {
    requestOptions.body = JSON.stringify(data)
  }
  const response = await fetch(`${BASE_URL}${url}`, requestOptions)
  return handleResponse(response)
}

const put = async (url, data = {}) => {
  const config = {
    method: 'PUT',
    headers: getHeaders(),
  }

  if (Object.keys(data).length > 0) {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(`${BASE_URL}${url}`, config)
  return handleResponse(response)
}

const deleteRequest = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleResponse(response)
}

const http = {
  get,
  post,
  put,
  deleteRequest,
}

export default http
