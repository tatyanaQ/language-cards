import express from 'express'
import path from 'path'
import cors from 'cors'
import router from './router'
import { dbConnect } from './db/models/connect'

const initApp = () => {
  const app = express()

  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: '*',
    })
  )

  app.use(express.static(path.join(__dirname, 'frontend')))

  app.use('/api', router)

  return app
}

const init = async () => {
  const app = initApp()

  const port = process.env.PORT || 8000

  await dbConnect()

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

init().catch((error) => {
  console.log(`[server]: Server failed to start. ${error.stack}`)
})
