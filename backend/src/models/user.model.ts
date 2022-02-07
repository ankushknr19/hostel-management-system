import dotenv from 'dotenv'
import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

dotenv.config()

export interface UserInput {
  email: string
  password: string
  phone_number: number
  hostel: {
    name: string
    address: {
      district: string
      city: string
      ward: string
      street: string
    }
  }
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

//sub document to nest on user schema
const hostelSchema = new Schema(
  {
    name: { type: String, required: true },
    address: {
      district: { type: String, required: true },
      city: { type: String, required: true },
      ward: { type: String, required: true },
      street: String,
    },
  },
  { _id: false }
)

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true, unique: true },
    hostel: hostelSchema, //nested schema
  },
  { timestamps: true }
)

//pre is a middleware, runs before saving the document
userSchema.pre('save', async function (next) {
  let user = this as UserDocument // 'this' is the document to be created

  if (!user.isModified('password')) {
    return next()
  }

  const saltRound: number = parseInt(process.env.SALT_ROUND || '')

  const salt = await bcrypt.genSalt(saltRound)
  const hash = bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as UserDocument

  return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}

export const UserModel = model<UserDocument>('User', userSchema)
