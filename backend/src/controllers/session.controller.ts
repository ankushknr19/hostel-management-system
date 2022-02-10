import { Request, Response } from 'Express'
import { get } from 'lodash'
import { SessionModel } from '../models/session.model'
import { UserModel } from '../models/user.model'
import { signJwt, verifyJwt } from '../utils/jwt.utils'

// @desc create a new user login session
// @route POST /api/sessions
// @access private/user

export const createSession = async (req: Request, res: Response) => {
  try {
    //find user by email and valildate password
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new Error('invalid email')
    }

    const isValid = await user.comparePassword(password)

    if (!isValid) {
      throw new Error('invalid password')
    }

    //create a session
    const session = await SessionModel.create({ user: user._id })

    //create access token
    const accessToken = signJwt(
      { userId: user._id, sessionId: session._id },
      { expiresIn: process.env.accessTokenTimeToLive }
    )

    //create refresh token
    const refreshToken = signJwt(
      { userId: user._id, sessionId: session._id },
      { expiresIn: process.env.refreshTokenTimeToLive }
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

// @desc delete the user session
// @route DELETE /api/sessions
// @access private/user

export const deleteSession = async (_req: Request, res: Response) => {
  try {
    const sessionId = res.locals.user.sessionId

    await SessionModel.updateOne({ _id: sessionId }, { valid: false })

    res.send({
      accessToken: null,
      refreshToken: null,
    })
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}

// @desc reissue a new accesstoken after it expired and refresh token exists
//  @access private/user

export async function reissueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  //verify refresh token
  const { decoded } = verifyJwt(refreshToken)

  //we need session id to make sure the session is still valid before issuing accesstoken
  if (!decoded || !get(decoded, 'sessionId')) {
    return false
  }

  const session = await SessionModel.findById(get(decoded, 'sessionId'))

  if (!session || !session.valid) {
    return false
  }

  //find user
  const user = await UserModel.findById(session?.user)

  if (!user) {
    return false
  }

  //if we do have a user, create a new accesstoken
  const accessToken = signJwt(
    { userId: user?._id, sessionId: session?._id },
    { expiresIn: process.env.accessTokenTimeToLive }
  )

  return accessToken
}
