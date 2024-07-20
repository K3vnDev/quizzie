import express, { json } from 'express'
import './database.js'
import cookieParser from 'cookie-parser'
import { quizRouter } from './routers/quiz.js'
import cors from 'cors'
import { userRouter } from './routers/user.js'
import { $success } from './services/jsonMessages.js'

const app = express()

app.use(json())
app.use(cors())
app.use(cookieParser())
app.disable('x-powered-by')

app.get('/fizz', (_, res) => res.json($success('buzz')))

app.use('/quiz', quizRouter)
app.use('/user', userRouter)

const port = process.env.PORT ?? 3000
app.listen(port, () => console.log(`app listening on port ${port}!`))
