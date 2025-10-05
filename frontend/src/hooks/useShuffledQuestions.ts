import { useMemo } from 'react'
import { shuffleArray } from '../utils'
import { useQuestions } from './useQuestions'

export function useShuffledQuestions(params: { tag?: string; limit?: number }) {
  const { questions, loading, error } = useQuestions({ tag: params.tag })

  const shuffledQuestions = useMemo(() => {
    return shuffleArray(questions).slice(0, params.limit)
  }, [questions, params.limit])

  return { shuffledQuestions, loading, error }
}
