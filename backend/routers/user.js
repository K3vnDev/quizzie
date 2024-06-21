import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User, validateUser } from '../schemas/User.js'
import { compare, hash } from 'bcrypt'
import { $error, $success } from '../services/jsonMessages.js'

export const userRouter = Router()

userRouter.post('/register', async (req, res) => {
  const userFromReq = req.body

  const { success, data: validatedUser, error } = validateUser(userFromReq)
  if (!success) return res.status(300).json(error.issues)

  const { username, password } = validatedUser

  if (await User.findOne({ username })) {
    return res.status(300).json($error('username already exists'))
  }

  try {
    const passwordHash = await hash(password, 10)
    const newUser = new User({ username, passwordHash })
    await newUser.save()

    const token = jwt.sign({ username }, process.env.SKW)
    res.status(201).cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict'
    }).json($success(''))
  } catch {
    res.status(500).json($error('couldnt create username'))
  }
})

userRouter.post('/login', async (req, res) => {
  const userFromReq = req.body
  const { success, data: validatedUser, error } = validateUser(userFromReq)
  if (!success) return res.status(300).json(error.issues)

  const { username, password } = validatedUser
  const user = await User.findOne({ username })
  if (!user) return res.status(300).json($error('invalid username or password'))

  if (await compare(password, user.passwordHash)) {
    const token = jwt.sign({ username }, process.env.SKW)
    console.log('compared true')
    return res.status(200).cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict'
    }).json($success(''))
  }
  res.status(300).json($error('invalid username or password'))
})

userRouter.post('/logout', async (req, res) => {
  res.clearCookie('token').json($success(''))
})
