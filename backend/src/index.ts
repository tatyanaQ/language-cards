import express from 'express'
import path from 'path'
import cors from 'cors'
import router from './router'
import { dbConnect } from './db/models/connect'

const app = express()

const initApp = () => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: '*',
    })
  )

  app.use(express.static(path.join(__dirname, 'public')))

  app.use('/api', router)
}

const init = async () => {
  initApp()

  const port = process.env.PORT || 8000

  // await dbConnect()

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

init().catch((error) => {
  console.log(`[server]: Server failed to start. ${error.stack}`)
})

export default app
