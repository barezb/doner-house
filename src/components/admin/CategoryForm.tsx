'use client'

import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { getAvailableIcons, getCategoryIcon } from '@/lib/icons'

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    icon: string
    order: number
    active: boolean
  } | null
  onClose: () => void
}

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    icon: category?.icon || 'doner',
    order: category?.order || 0,
    active: category?.active ?? true,
  })
  const [submitting, setSubmitting] = useState(false)

  const availableIcons = getAvailableIcons()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = category
        ? `/api/categories/${category.id}`
        : '/api/categories'
      const method = category ? 'PUT' : 'POST'

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
      console.error('Error saving category:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-bronco text-2xl">
            {category ? 'EDIT CATEGORY' : 'ADD CATEGORY'}
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
            <label className="block text-sm font-bold mb-2">Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {availableIcons.map((iconName) => {
                const Icon = getCategoryIcon(iconName)
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.icon === iconName
                        ? 'border-doner-vermillion bg-doner-vermillion text-white'
                        : 'border-gray-300 hover:border-doner-amber'
                    }`}
                  >
                    <Icon className="text-2xl mx-auto" />
                    <span className="text-xs mt-1 block">{iconName}</span>
                  </button>
                )
              })}
            </div>
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