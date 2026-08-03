import { useEffect, useState } from 'react'
import { fetchAiLesson } from '../api'
import { AiQuestion } from '../types'

export function useAiLesson(params: { tags?: string[]; limit?: number }) {
  const [sentences, setSentences] = useState<AiQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchAiLesson(params || {})
      .then(({ aiLesson }) => {
        setSentences(aiLesson)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [params?.tags, params?.limit])

  return { sentences, loading, error }
}
