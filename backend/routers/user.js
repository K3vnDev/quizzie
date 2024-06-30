import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User, validateUser } from '../schemas/User.js'
import { compare, hash } from 'bcrypt'
import { $error, $success } from '../services/jsonMessages.js'
import { Quiz } from '../schemas/Quiz.js'
import { userAuth } from '../middleware/userAuth.js'
import { generateColor } from '../services/generateColor.js'

export const userRouter = Router()

userRouter.post('/signup', async (req, res) => {
  const userFromReq = req.body

  const { success, data: validatedUser, error } = validateUser(userFromReq)
  if (!success) {
    return res
      .status(400)
      .json({
        ...$error('Invalid Data'),
        issues: error.issues
      })
  }

  const { username, password } = validatedUser
  const profileColor = generateColor()

  if (await User.findOne({ username })) {
    return res.status(406).json($error('Username already exists'))
  }

  try {
    const passwordHash = await hash(password, 10)
    const newUser = new User({
      username,
      passwordHash,
      profileColor
    })
    await newUser.save()

    const token = jwt.sign({
      username, profileColor
    }, process.env.SKW)

    return res
      .status(201)
      .json({
        ...$success('Sign up Successful'),
        data: {
          username,
          token
        }
      })
  } catch { res.status(500).json($error('Couldnt create username')) }
})

userRouter.post('/login', async (req, res) => {
  try {
    const userFromReq = req.body
    const { success, data: validatedUser, error } = validateUser(userFromReq)
    if (!success) {
      return res
        .status(400)
        .json({
          ...$error('Invalid Data'),
          issues: error.issues
        })
    }
    const { username, password } = validatedUser

    const user = await User.findOne({ username })
    if (!user) return res.status(401).json($error('Invalid username or password'))

    const { profileColor } = user

    if (await compare(password, user.passwordHash)) {
      const token = jwt.sign({
        username, profileColor
      }, process.env.SKW)

      return res
        .json({
          ...$success('Login Successful'),
          data: {
            username,
            token
          }
        })
    }
    res.status(401).json($error('Invalid username or password'))
  } catch { res.status(500) }
})

userRouter.use(userAuth)

// get all quizzes from an user
userRouter.get('/quizzes', async (req, res) => {
  const { username } = req
  if (!username) return res.status(401).json($error('Access denied'))

  const userFromDb = await User.findOne({ username })
  if (!userFromDb) return res.status(401).json($error('Access denied'))

  const { profileColor } = userFromDb

  const quizzes = await Quiz.find({ owner: username })
  res.json({
    ...$success('Quizzes successfully fetched'),
    data: {
      username,
      profileColor,
      quizzes
    }
  })
})
