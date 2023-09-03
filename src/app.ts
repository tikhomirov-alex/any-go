import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI
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

routes.forEach((route) => {
  const { method, path, middleware, controller } = route
  app[method](`/api/${path}`, ...middleware, controller)
})

const port = process.env.APP_PORT
app.listen(port, () => console.log(`App has been started on port ${port}...`))
