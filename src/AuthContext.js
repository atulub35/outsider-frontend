import { createContext, useContext, useState, useEffect } from "react"
import { getProfile, logout } from "./api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getProfile().then((data) => setUser(data.user))
  }, [])

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
