'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import MenuItemModal from './MenuItemModal'
import { getCategoryIcon } from '@/lib/icons'
import { formatPrice } from '@/lib/formatPrice'

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
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (const category of categories) {
        const section = sectionRefs.current[category.id]
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [categories])

  const scrollToCategory = (categoryId: string) => {
    const section = sectionRefs.current[categoryId]
    if (section) {
      const yOffset = -120
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="sticky top-20 z-40 bg-doner-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.icon)
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all ${
                    activeCategory === category.id
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
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {categories.map((category, index) => (
          <section
            key={category.id}
            ref={(el) => {
              if (el) sectionRefs.current[category.id] = el
            }}
            className={index > 0 ? 'mt-12' : ''}
          >
            <h2 className="font-bronco text-3xl mb-6 text-doner-black">
              {category.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {category.menuItems.map((item) => (
                <div
                  key={item.id}
                  className="menu-item cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-doner-amber to-doner-vermillion"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                          🍽️
                        </div>
                      </>
                    )}
                  </div>
                  <h3 className="font-bronco text-xl mb-2">{item.name}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  )}
                  <p className="font-bold text-doner-vermillion text-lg">
                    {formatPrice(item.price)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}