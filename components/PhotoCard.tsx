'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'

interface PhotoCardProps {
  id: number
  author: string
  url: string
  download_url: string
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function PhotoCard({
  id,
  author,
  url,
  isFavorite,
  onToggleFavorite,
}: PhotoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-200" style={{ position: 'relative' }}>
        <Image
          src={url}
          alt={`Photo by ${author}`}
          fill
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 transform transition-transform duration-300 group-hover:translate-y-0">
        <p className="text-sm font-medium text-white truncate">{author}</p>
      </div>

      {/* Heart Button */}
      <button
        onClick={() => onToggleFavorite(id)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 transition-all duration-200 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={20}
          className={`transition-colors duration-200 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>
    </div>
  )
}
