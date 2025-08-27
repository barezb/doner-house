'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { HiX } from 'react-icons/hi'
import { formatPrice } from '@/lib/formatPrice'

interface MenuItemModalProps {
  item: {
    id: string
    name: string
    description: string | null
    price: number
    image: string | null
  }
  onClose: () => void
}

export default function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto md:flex">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <HiX className="text-xl" />
        </button>

        {/* Image Section - Full height on desktop, aspect ratio preserved */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto md:min-h-[400px] rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden bg-gray-100">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain md:object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-doner-amber to-doner-vermillion flex items-center justify-center">
              <span className="text-6xl">🍽️</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <h2 className="font-bronco text-2xl md:text-4xl mb-3 md:mb-4">{item.name}</h2>
          {item.description && (
            <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">{item.description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-bronco text-2xl md:text-3xl text-doner-vermillion">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}