import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { quizRouter } from './routers/quiz.js'
import cors from 'cors'
import { userRouter } from './routers/user.js'
import { $success } from './services/jsonMessages.js'
import './database.js'

const { FRONT_URL } = process.env
export const app = express()

const corsOptions = {
  origin: FRONT_URL,
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(json())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/fizz', (_, res) => res.json($success('buzz')))

app.use('/quiz', quizRouter)
app.use('/user', userRouter)

export default app

// This is for testing purposes only
// app.listen(3000, () => {
//   console.log('Server is running on port 3000')
// })
