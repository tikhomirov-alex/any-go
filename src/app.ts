import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import passportConfig from './config/passport'
import { routes } from './routes'
import swaggerUi from 'swagger-ui-express'
import 'dotenv/config'

if (!process.env.MONGO_URI) {
  console.log('Fatal error: environment variable MONGO_URI is empty')
  process.exit(1)
}

const mongoURI = process.env.MONGO_URI

async function main() {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('MongoDB connected...')
    })
    .catch((err) => {
      console.log(`Unable to connect MongoDB: ${err}`)
      process.exit(1)
    })

  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())

  app.use(passport.initialize())
  passportConfig(passport)

  routes.forEach((route) => {
    const { method, path, middleware, controller } = route
    app[method](`/api/${path}`, ...middleware, controller)
  })

  const swaggerDocPath = require('./docs/openapi.json')
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocPath, { customSiteTitle: 'AnyGo API Docs' })
  )

  const port = process.env.APP_PORT
  app.listen(port, () => console.log(`App has been started on port ${port}...`))
}

main()
