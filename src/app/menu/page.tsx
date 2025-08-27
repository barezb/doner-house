'use client'

import { useState, useEffect } from 'react'
import MenuDisplay from '@/components/menu/MenuDisplay'
import { FaSync } from 'react-icons/fa'

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
}

interface Category {
  id: string
  name: string
  icon: string
  menuItems: MenuItem[]
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchMenuData()
    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      fetchMenuData(true)
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchMenuData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    }
    try {
      const response = await fetch(`/api/menu?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      })
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        console.error('Failed to fetch menu data')
      }
    } catch (error) {
      console.error('Error fetching menu data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchMenuData(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-doner-white">
        <div className="bg-gradient-to-br from-doner-red to-doner-vermillion py-16">
          <h1 className="font-bronco text-5xl text-center text-white">OUR MENU</h1>
        </div>
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-doner-vermillion mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-doner-white">
      <div className="bg-gradient-to-br from-doner-red to-doner-vermillion py-16 relative">
        <h1 className="font-bronco text-5xl text-center text-white">OUR MENU</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all disabled:opacity-50"
          title="Refresh menu"
        >
          <FaSync className={`text-xl ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <MenuDisplay categories={categories} />
    </div>
  )
}