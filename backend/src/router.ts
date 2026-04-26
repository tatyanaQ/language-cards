import { Router, Request, Response } from 'express'
import { Types } from 'mongoose'
import { Question } from './db/models/question'
import { getLesson } from './service/lesson'
import { generateSentences } from './ai/service'

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
  const {
    id,
    item,
    translation,
    tag,
    page = '1',
    limit = '100',
  } = req.query || {}

  const query = {
    ...(id && { _id: new Types.ObjectId(id.toString()) }),
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
  const limit = Number(req.query?.limit) ?? 20
  const tags = req.query?.tag ? [String(req.query.tag)] : undefined

  const questions = await getLesson({ tags, limit: Number(limit) })

  res.json({ questions })
})

router.get('/lesson-ai', async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query?.limit) ?? 20, 20)
  const tags = req.query?.tag ? [String(req.query.tag)] : undefined

  const questions = await getLesson({ tags, limit: Number(limit) })

  const aiLesson = await generateSentences(questions)

  res.json({ questions, aiLesson })
})

export default router
