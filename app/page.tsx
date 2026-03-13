'use client'

import { useState } from 'react'
import { useFetchPhotos } from '@/hooks/useFetchPhotos'
import { useFavoritesReducer } from '@/hooks/useFavoritesReducer'
import { SearchBar } from '@/components/SearchBar'
import { Gallery } from '@/components/Gallery'

export default function PhotoGalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { photos, loading, error } = useFetchPhotos()
  const { toggleFavorite, isFavorite } = useFavoritesReducer()

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Photo Gallery
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore beautiful photos and save your favorites
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by author name..."
          />
        </div>

        {/* Gallery Grid */}
        <Gallery
          photos={photos}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </main>
  )
}
