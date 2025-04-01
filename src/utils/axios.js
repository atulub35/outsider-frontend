import axios from 'axios'
import { API_URL } from '../config'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Add this function to initialize headers with existing token
const initializeAxiosHeaders = () => {
  const token = localStorage.getItem('token')
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const isTokenSet = () => {
  return axiosInstance.defaults.headers.common['Authorization']
}

export const setupAxiosInterceptors = (onUnauthorized) => {
  // Initialize headers when setting up interceptors
  initializeAxiosHeaders()
  // Bail out if token is not set in axiosInstance.defaults.headers.common['Authorization'] while making a request
  // axiosInstance.interceptors.request.use(
  //   (config) => {
  //     console.log('token is not set in', isTokenSet())
  //     if (!isTokenSet()) {
  //       return Promise.reject(new Error('Token is not set'))
  //     }
  //     return config
  //   },
  //   (error) => Promise.reject(error)
  // )
  // Update token when response is successful
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('response got here in interceptors', response?.data?.token)
      if (response?.data?.token) {
        const token = response?.data?.token
        localStorage.setItem('token', token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        console.log('Authorization header updated', axiosInstance.defaults.headers.common['Authorization'])
      }
      return response
    },
    (error) => {
        console.log('error got here', error)
      if (error.response?.status === 401) {
        onUnauthorized()
      }
      return Promise.reject(error)
    }
  )
}

// Add this after initializing axiosInstance
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request headers:', config.headers)
    return config
  },
  (error) => Promise.reject(error)
) 