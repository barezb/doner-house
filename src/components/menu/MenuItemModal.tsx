'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { HiX } from 'react-icons/hi'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <HiX className="text-xl" />
        </button>

        {item.image ? (
          <div className="relative h-64 bg-gradient-to-br from-doner-amber to-doner-vermillion rounded-t-xl">
            <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
              🍽️
            </div>
          </div>
        ) : (
          <div className="h-64 bg-gradient-to-br from-doner-amber to-doner-vermillion rounded-t-xl flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}

        <div className="p-6">
          <h2 className="font-bronco text-3xl mb-3">{item.name}</h2>
          {item.description && (
            <p className="text-gray-600 mb-4">{item.description}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-bronco text-2xl text-doner-vermillion">
              ${item.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}