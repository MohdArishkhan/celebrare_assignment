'use client'

import { useEffect, useReducer } from 'react'

type FavoritesAction = 
  | { type: 'ADD'; payload: number }
  | { type: 'REMOVE'; payload: number }
  | { type: 'LOAD'; payload: number[] }

const favoritesReducer = (state: number[], action: FavoritesAction): number[] => {
  switch (action.type) {
    case 'ADD':
      return state.includes(action.payload) ? state : [...state, action.payload]
    case 'REMOVE':
      return state.filter(id => id !== action.payload)
    case 'LOAD':
      return action.payload
    default:
      return state
  }
}

export function useFavoritesReducer() {
  const [favorites, dispatch] = useReducer(favoritesReducer, [])
  const [isHydrated, setIsHydrated] = useReducer(() => true, false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('photoFavorites')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        dispatch({ type: 'LOAD', payload: parsed })
      } catch (err) {
        console.error('Failed to parse favorites from localStorage:', err)
      }
    }
    setIsHydrated()
  }, [])

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('photoFavorites', JSON.stringify(favorites))
    }
  }, [favorites, isHydrated])

  const toggleFavorite = (photoId: number) => {
    if (favorites.includes(photoId)) {
      dispatch({ type: 'REMOVE', payload: photoId })
    } else {
      dispatch({ type: 'ADD', payload: photoId })
    }
  }

  const isFavorite = (photoId: number) => favorites.includes(photoId)

  return { favorites, toggleFavorite, isFavorite }
}
