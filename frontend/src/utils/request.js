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
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

const put = async (url, data) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
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
