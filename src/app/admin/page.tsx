'use client'

import Link from 'next/link'
import { FaUtensils, FaListAlt, FaPlus, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/admin/ProtectedRoute'

function AdminDashboardContent() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-doner-black py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-bronco text-4xl text-white">ADMIN DASHBOARD</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-doner-red hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/categories" className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <FaListAlt className="text-3xl text-doner-vermillion mr-4" />
              <h2 className="font-bronco text-2xl">CATEGORIES</h2>
            </div>
            <p className="text-gray-600">Manage menu categories and their icons</p>
          </Link>

          <Link href="/admin/menu-items" className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <FaUtensils className="text-3xl text-doner-vermillion mr-4" />
              <h2 className="font-bronco text-2xl">MENU ITEMS</h2>
            </div>
            <p className="text-gray-600">Add, edit, and remove menu items</p>
          </Link>

          <Link href="/admin/menu-items/new" className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <FaPlus className="text-3xl text-doner-amber mr-4" />
              <h2 className="font-bronco text-2xl">ADD ITEM</h2>
            </div>
            <p className="text-gray-600">Quick add new menu item</p>
          </Link>

          <Link href="/admin/settings" className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <FaCog className="text-3xl text-doner-black mr-4" />
              <h2 className="font-bronco text-2xl">SETTINGS</h2>
            </div>
            <p className="text-gray-600">Configure system settings</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminDashboardContent />
      </ProtectedRoute>
    </AuthProvider>
  )
}