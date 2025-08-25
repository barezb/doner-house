'use client'

import { useState, useEffect } from 'react'
import { HiX } from 'react-icons/hi'
import ImageUpload from './ImageUpload'

interface MenuItemFormProps {
  menuItem?: {
    id: string
    name: string
    description: string | null
    price: number
    image: string | null
    categoryId: string
    order: number
    active: boolean
  } | null
  onClose: () => void
}

interface Category {
  id: string
  name: string
}

export default function MenuItemForm({ menuItem, onClose }: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: menuItem?.name || '',
    description: menuItem?.description || '',
    price: menuItem?.price || 0,
    image: menuItem?.image || '',
    categoryId: menuItem?.categoryId || '',
    order: menuItem?.order || 0,
    active: menuItem?.active ?? true,
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
        if (!formData.categoryId && data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: data[0].id }))
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = menuItem
        ? `/api/menu-items/${menuItem.id}`
        : '/api/menu-items'
      const method = menuItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onClose()
      }
    } catch (error) {
      console.error('Error saving menu item:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageUpload = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="font-bronco text-2xl">
            {menuItem ? 'EDIT MENU ITEM' : 'ADD MENU ITEM'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <HiX className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-doner-vermillion"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-doner-vermillion"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-doner-vermillion"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Category</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-doner-vermillion"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image</label>
            <ImageUpload
              currentImage={formData.image}
              onImageUpload={handleImageUpload}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-doner-vermillion"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm font-bold">Active</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}