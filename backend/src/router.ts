import { Router, Request, Response } from 'express'
import { questions } from './db'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ data: 'hello from api' })
})

router.get('/tags', (req: Request, res: Response) => {
  const allTags = questions.flatMap(({ tags }) => tags)

  res.json({
    tags: Array.from(new Set(allTags)),
  })
})

router.get('/lesson', (req: Request, res: Response) => {
  const { tag } = req.query || {}

  const qs = questions.filter(({ tags }) =>
    tag ? tags.includes(tag as string) : true
  )

  res.json({ questions: qs })
})

export default router
