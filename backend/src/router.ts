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

router.get('/lesson', async (req: Request, res: Response) => {
  const { tag, limit } = req.query || {}

  const query = { ...(tag && { tags: tag }) }

  const options = { ...(limit && { limit: Number(limit) }) }

  const questions = await Question.find(query, null, options)

  res.json({ questions })
})

export default router
