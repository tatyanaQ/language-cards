import React, { useState, useEffect } from 'react'
import { fetchLesson } from '../api'
import { Question } from '../types'

export const useQuestions = (params?: {
  tag?: string
  page?: number
  limit?: number
}) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsCount, setQuestionsCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchLesson(params || {})
      .then(({ questions, count }) => {
        setQuestions(questions)
        setQuestionsCount(count)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [params?.tag, params?.page, params?.limit])

  return { questions, questionsCount, loading, error }
}
