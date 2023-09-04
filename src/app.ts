import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import passportConfig from './config/passport'
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
passportConfig(passport)

routes.forEach((route) => {
  const { method, path, middleware, controller } = route
  app[method](`/api/${path}`, ...middleware, controller)
})

const port = process.env.APP_PORT
app.listen(port, () => console.log(`App has been started on port ${port}...`))
