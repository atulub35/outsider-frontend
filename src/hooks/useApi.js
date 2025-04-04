import { useAuth } from '../contexts/AuthContext'
import { axiosInstance } from '../utils/axios'

export const useApi = () => {
  const { token } = useAuth()

  // Request interceptor for adding auth token
  // axiosInstance.interceptors.request.use(
  //   (config) => {
  //     if (token) {
  //       console.log('token reacher here', token);
        
  //       config.headers.Authorization = token
  //     }
  //     return config
  //   },
  //   (error) => Promise.reject(error)
  // )

  const api = {
    login: async (formData) => {
      try {
        return await axiosInstance.post('/users/sign_in.json', { user: formData })
      } catch (error) {
        throw error
      }
    },

    getProfile: () => axiosInstance.get('/profiles/show.json'),

    logout: () => axiosInstance.delete('/users/sign_out.json'),

    getPosts: (page = 1) => axiosInstance.get(`/posts.json?page=${page}`),

    createPost: (formData) => axiosInstance.post('/posts.json', { post: { body: formData.body, title: formData.title } }),

    updatePost: (postId, formData) => axiosInstance.put(`/posts/${postId}.json`, { post: { body: formData.body, title: formData.title } }),

    deletePost: (postId) => axiosInstance.delete(`/posts/${postId}.json`),

    like: (postId) => axiosInstance.get(`/posts/${postId}/like.json`),

    repost: (postId) => axiosInstance.get(`/posts/${postId}/repost.json`)
  }

  return api
} 