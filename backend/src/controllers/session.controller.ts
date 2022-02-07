import dotenv from 'dotenv'
import { Request, Response } from 'Express'
import { SessionModel } from '../models/session.model'
import { signJwt } from '../utils/jwt.utils'
import { validatePassword } from './user.controller'

dotenv.config()

// @desc create a new user session
// @route POST /api/sessions
// @access private/user

export const createSession = async (req: Request, res: Response) => {
  try {
    //valildate user password
    const { email, password } = req.body

    const user = await validatePassword(email, password)

    if (!user) {
      throw new Error('Invalid email or password')
    }
    //create a session
    const session = await SessionModel.create({ user: user._id })

    //create access token
    const { accessTokenTimeToLive } = process.env

    const accessToken = signJwt(
      { userId: user._id, session: session._id }, //!!should not pass all of 'user'!!
      { expiresIn: accessTokenTimeToLive } //15 minutes
    )

    //create refresh token
    const { refreshTokenTimeToLive } = process.env
    const refreshToken = signJwt(
      { userId: user._id, session: session._id },
      { expiresIn: refreshTokenTimeToLive } //1 year
    )

    //return access token and refresh token
    res.send({ accessToken, refreshToken })
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}

// @desc get the user session
// @route GET /api/sessions
// @access private/user

export const getSession = async (_req: Request, res: Response) => {
  try {
    //get user id
    console.log(res.locals.user)
    const userId = res.locals.user.userId

    //find session of a user with valid token
    const session = await SessionModel.find({
      user: userId,
      valid: true,
    }).lean()

    res.send(session)
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}
