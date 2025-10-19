import { useEffect, useState } from 'react'
import { fetchLesson } from '../api'
import { Question } from '../types'

export function useLesson(params: { tag?: string; limit?: number }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchLesson(params || {})
      .then(({ questions }) => {
        setQuestions(questions)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [params?.tag, params?.limit])

  return { questions, loading, error }
}
