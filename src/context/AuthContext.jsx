import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setToken(accessToken)
      // You can also decode the token to get user info if needed
      // For now, we'll just set a basic user state
      setUser({ authenticated: true })
    }
    setIsLoading(false)
  }, [])

  const login = (accessToken, userData = null) => {
    localStorage.setItem('accessToken', accessToken)
    setToken(accessToken)
    setUser(userData || { authenticated: true })
    message.success('Login successful!')
  }

  const logout = () => {
    try {
      localStorage.clear()
      setToken(null)
      setUser(null)
      message.success('Logged out successfully!')
      navigate('/login')
    } catch (error) {
      message.error('Error during logout')
    }
  }

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
