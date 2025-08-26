'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        setError('Invalid username or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-doner-red to-doner-vermillion flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Image 
            src="/logo.svg" 
            alt="Doner House Logo" 
            width={150} 
            height={50}
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="font-bronco text-2xl text-doner-black">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-doner-vermillion"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-doner-vermillion"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}