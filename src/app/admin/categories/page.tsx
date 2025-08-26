'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import CategoryForm from '@/components/admin/CategoryForm'
import { getCategoryIcon } from '@/lib/icons'
import { AuthProvider } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

interface Category {
  id: string
  name: string
  icon: string
  order: number
  active: boolean
}

function CategoriesPageContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchCategories()
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingCategory(null)
    fetchCategories()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-doner-black py-6">
        <div className="container mx-auto px-4">
          <Link href="/admin" className="text-doner-white hover:text-doner-amber inline-flex items-center mb-4">
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="font-bronco text-4xl text-white">MANAGE CATEGORIES</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Add New Category
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.icon)
              return (
                <div key={category.id} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Icon className="text-3xl text-doner-vermillion mr-3" />
                      <h3 className="font-bronco text-xl">{category.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Order: {category.order}</p>
                    <p>Status: {category.active ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <CategoriesPageContent />
      </ProtectedRoute>
    </AuthProvider>
  )
}