import { Question, QuestionDocument } from '../db/models/question'

export const getLesson = async (params: {
  limit: number
  tags?: string[]
}): Promise<QuestionDocument[]> => {
  const { limit, tags } = params

  const query = {
    ...(tags?.length ? { tags: { $in: tags } } : {}),
  }

  const pipeline = [
    ...(Object.keys(query).length ? [{ $match: query }] : []),
    { $sample: { size: limit } },
  ]

  return await Question.aggregate(pipeline)
}
