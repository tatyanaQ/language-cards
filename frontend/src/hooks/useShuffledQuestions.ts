import { shuffleArray } from '../utils'
import { useQuestions } from './useQuestions'

export function useShuffledQuestions(params: { tag?: string; limit?: number }) {
  const { questions, loading, error } = useQuestions({ tag: params.tag })

  const shuffledQuestions = shuffleArray(questions).slice(0, params.limit)

  return { shuffledQuestions, loading, error }
}
