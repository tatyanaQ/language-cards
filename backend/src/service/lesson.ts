import { Question, IQuestion } from '../db/models/question'

export const getLesson = async (
  query: Record<string, unknown> = {}
): Promise<IQuestion[]> => {
  const { tag, limit = '20' } = query

  const match = {
    ...(tag ? { tags: tag } : {}),
  }

  const numberLimit = Number(limit)

  const pipeline = [
    ...(Object.keys(match).length ? [{ $match: match }] : []),
    { $sample: { size: numberLimit } },
  ]

  return await Question.aggregate(pipeline)
}
