import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptors, axiosInstance } from '../utils/axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    setupAxiosInterceptors(() => {
      // Clear auth state
      setToken(null)
      localStorage.removeItem('token')
      // Redirect to login
      navigate('/login')
    })
  }, [navigate])

  const login = (newToken) => {
    setToken(`Bearer ${newToken}`)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    axiosInstance.defaults.headers.common['Authorization'] = null
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 