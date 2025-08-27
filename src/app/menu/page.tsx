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
        {/* Header */}
        <div className="bg-gradient-to-br from-doner-red to-doner-vermillion py-16 relative">
          <h1 className="font-bronco text-5xl text-center text-white">OUR MENU</h1>
          <div className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-lg">
            <div className="w-6 h-6 bg-white bg-opacity-30 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Category Navigation Skeleton */}
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 py-4 overflow-x-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 bg-white"
                >
                  <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Content Skeleton */}
        <div className="container mx-auto px-4 py-8">
          {[1, 2, 3].map((categoryIndex) => (
            <section key={categoryIndex} className="mb-12">
              {/* Category Title Skeleton */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
              </div>

              {/* Mobile List Skeleton */}
              <div className="md:hidden space-y-3">
                {[1, 2, 3, 4, 5, 6].map((itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                    {/* Image Skeleton */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-300 rounded-lg animate-pulse"></div>
                    
                    {/* Content Skeleton */}
                    <div className="flex-grow">
                      <div className="w-3/4 h-5 bg-gray-300 rounded animate-pulse mb-2"></div>
                      <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    
                    {/* Price Skeleton */}
                    <div className="w-20 h-5 bg-doner-amber rounded animate-pulse flex-shrink-0"></div>
                  </div>
                ))}
              </div>

              {/* Desktop/Tablet Grid Skeleton */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Image Skeleton */}
                    <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                    
                    {/* Content Skeleton */}
                    <div className="p-4">
                      {/* Name Skeleton */}
                      <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
                      
                      {/* Description Skeleton */}
                      <div className="space-y-2 mb-4">
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      
                      {/* Price Skeleton */}
                      <div className="w-24 h-6 bg-doner-amber rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
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