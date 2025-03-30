import { useAuth } from '../contexts/AuthContext'
import { API_URL } from '../config'

export const useApi = () => {
  const { token } = useAuth()

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token && { "Authorization": token })
  }

  const api = {
    login: async (formData) => {
      try {
        const response = await fetch(`${API_URL}/users/sign_in.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: formData }),
        })
        
        if (!response.ok) {
          throw new Error('Login failed')
        }
        
        return await response.json()
      } catch (error) {
        throw error
      }
    },

    getProfile: async () => {
      const res = await fetch(`${API_URL}/profiles/show.json`, {
        headers
      })
      return res.json()
    },

    logout: async () => {
      await fetch(`${API_URL}/users/sign_out.json`, {
        method: "DELETE",
        headers
      })
    },

    getPosts: async () => {
      const res = await fetch(`${API_URL}/posts.json`, {
        method: "GET",
        headers
      })
      return res.json()
    },

    createPost: async (formData) => {
      const res = await fetch(`${API_URL}/posts.json`, {
        method: "POST",
        headers,
        body: JSON.stringify({ post: formData }),
      })
      return res.json()
    },

    updatePost: async (formData) => {
      const res = await fetch(`${API_URL}/posts.json`, {
        method: "POST",
        headers,
        body: JSON.stringify({ post: formData }),
      })
      return res.json()
    },

    deletePost: async (postId) => {
      const res = await fetch(`${API_URL}/posts/${postId}.json`, {
        method: "DELETE",
        headers
      })
      return res.json()
    },

    like: async (postId) => {
      const res = await fetch(`${API_URL}/posts/${postId}/like.json`, {
        method: "GET",
        headers
      })
      return res.json()
    },

    repost: async (postId) => {
      const res = await fetch(`${API_URL}/posts/${postId}/repost.json`, {
        method: "GET",
        headers
      })
      return res.json()
    }
  }

  return api
} 