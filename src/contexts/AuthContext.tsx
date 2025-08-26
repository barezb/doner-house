'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}