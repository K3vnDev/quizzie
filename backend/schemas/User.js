import { model, Schema } from 'mongoose'
import { z } from 'zod'

const userSchema = new Schema({
  username: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export const User = model('User', userSchema)

// Validations
const userValidationSchema = z.object({
  username: z.string().trim().min(3).max(20),
  password: z.string().min(5).max(50)
})

export const validateUser = user => userValidationSchema.safeParse(user)
