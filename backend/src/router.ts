import { Router, Request, Response } from 'express'
import { Question } from './db/models/question'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ data: 'hello from api' })
})

router.get('/tags', async (req: Request, res: Response) => {
  const questions = await Question.find()
  const allTags = questions.flatMap(({ tags }) => tags)

  res.json({
    tags: Array.from(new Set(allTags)),
  })
})

router.get('/questions', async (req: Request, res: Response) => {
  const { item, translation, tag, page = '1', limit = '100' } = req.query || {}

  const query = {
    ...(item && { item: new RegExp(String(item), 'i') }),
    ...(translation && { translation: new RegExp(String(translation), 'i') }),
    ...(tag && { tags: tag }),
  }

  const numberPage = Number(page)
  const numberLimit = Number(limit)

  const options = {
    skip: (numberPage - 1) * numberLimit,
    limit: numberLimit,
  }

  const questions = await Question.find(query, null, options)
  const count = await Question.countDocuments(query)

  res.json({ questions, count })
})

router.get('/lesson', async (req: Request, res: Response) => {
  const { tag, limit = '20' } = req.query || {}

  const query = {
    ...(tag && { tags: tag }),
  }

  const numberLimit = Number(limit)

  const pipeline = [
    ...(Object.keys(query).length ? [{ $match: query }] : []),
    { $sample: { size: numberLimit } },
  ]

  const questions = await Question.aggregate(pipeline)

  res.json({ questions })
})

export default router
