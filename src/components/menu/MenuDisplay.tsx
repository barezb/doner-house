'use client'

import { useState } from 'react'
import Image from 'next/image'
import MenuItemModal from './MenuItemModal'
import { getCategoryIcon } from '@/lib/icons'

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

interface MenuDisplayProps {
  categories: Category[]
}

export default function MenuDisplay({ categories }: MenuDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0]?.id || null
  )
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const activeCategory = categories.find(cat => cat.id === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon)
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-doner-vermillion text-white scale-105'
                  : 'bg-white text-doner-black hover:bg-doner-amber'
              }`}
            >
              <Icon className="text-2xl mb-1" />
              <span className="text-xs font-medium whitespace-nowrap">
                {category.name}
              </span>
            </button>
          )
        })}
      </div>

      {activeCategory && (
        <div>
          <h2 className="font-bronco text-3xl mb-6 text-doner-black">
            {activeCategory.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.menuItems.map((item) => (
              <div
                key={item.id}
                className="menu-item cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {item.image && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-doner-amber to-doner-vermillion"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                      🍽️
                    </div>
                  </div>
                )}
                <h3 className="font-bronco text-xl mb-2">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                )}
                <p className="font-bold text-doner-vermillion text-lg">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}