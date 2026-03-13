'use client'

import { useMemo } from 'react'
import { PhotoCard } from './PhotoCard'
import { Loader2 } from 'lucide-react'

interface Photo {
  id: number
  author: string
  url: string
  download_url: string
}

interface GalleryProps {
  photos: Photo[]
  loading: boolean
  error: string | null
  searchQuery: string
  isFavorite: (photoId: number) => boolean
  onToggleFavorite: (photoId: number) => void
}

export function Gallery({
  photos,
  loading,
  error,
  searchQuery,
  isFavorite,
  onToggleFavorite,
}: GalleryProps) {
  // UseMemo used here as mentioned in the assignment. 
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return photos
    }
    return photos.filter(photo =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [photos, searchQuery])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-gray-600">Loading photos...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading photos</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  // Empty state when no results
  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-gray-500 text-lg">No photos available</p>
      </div>
    )
  }

  // No search results
  if (searchQuery && filteredPhotos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-gray-600 font-medium mb-1">No photos found</p>
          <p className="text-gray-500 text-sm">Try searching for a different author name</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {filteredPhotos.map(photo => (
        <PhotoCard
          key={photo.id}
          id={photo.id}
          author={photo.author}
          url={photo.url}
          download_url={photo.download_url}
          isFavorite={isFavorite(photo.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
