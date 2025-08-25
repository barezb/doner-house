'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa'

interface ImageUploadProps {
  currentImage: string | null
  onImageUpload: (imageUrl: string) => void
}

export default function ImageUpload({ currentImage, onImageUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { url } = await res.json()
        setPreview(url)
        onImageUpload(url)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageUpload('')
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <div className="relative h-48 bg-gradient-to-br from-doner-amber to-doner-vermillion rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
              🍽️
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-doner-vermillion">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}

      {uploading && (
        <div className="text-center text-sm text-gray-600">
          Uploading image...
        </div>
      )}
    </div>
  )
}