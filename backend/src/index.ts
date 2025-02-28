import express, { Express } from 'express'
import path from 'path'
import cors from 'cors'
import router from './router'

const app: Express = express()
const port = process.env.PORT || 8000

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: '*',
  })
)

app.use(express.static(path.join(__dirname, 'frontend')))

app.use('/api', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
