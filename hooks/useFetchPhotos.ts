'use client'

import { useState, useEffect } from 'react'

interface Photo {
  id: number
  author: string
  url: string
  download_url: string
}

interface UseFetchPhotosReturn {
  photos: Photo[]
  loading: boolean
  error: string | null
}

export function useFetchPhotos(): UseFetchPhotosReturn {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://picsum.photos/v2/list?limit=30')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.statusText}`)
        }
        
        const data: Photo[] = await response.json()
        setPhotos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching photos')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return { photos, loading, error }
}
