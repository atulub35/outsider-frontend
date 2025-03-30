import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'))

  const login = (newToken) => {
    setToken(`Bearer ${newToken}`)
    localStorage.setItem('authToken', `Bearer ${newToken}`)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('authToken')
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