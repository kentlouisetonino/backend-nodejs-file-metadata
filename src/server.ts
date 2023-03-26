require('dotenv').config()
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import morgan from 'morgan'
import HomeRouter from './router/HomeRouter'

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const app = express()

// * listen for requests
app.listen(PORT, function () {
  console.log('Server is live at http://localhost:' + PORT)
})

// * connect with mongodb
mongoose.connect(MONGODB_URI ?? '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)

// * middlewares
app.use(morgan('tiny'))
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.static('public'))

// * endpoints
app.use('/', HomeRouter)
