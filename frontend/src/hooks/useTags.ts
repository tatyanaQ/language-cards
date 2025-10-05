import React, { useState, useEffect } from 'react'
import { fetchTags } from '../api'

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchTags()
      .then((response) => setTags(response.tags))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { tags, loading, error }
}
