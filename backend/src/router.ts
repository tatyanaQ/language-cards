import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ data: 'hello from api' })
})

router.get('/lesson', (req: Request, res: Response) => {
  res.json({
    questions: [
      {
        q: 'Hello',
        a: 'Labas',
      },
      {
        q: 'Bye',
        a: 'Viso gero',
      },
    ],
  })
})

export default router
