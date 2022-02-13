import { Request, Response } from 'Express'
import { UserModel } from '../models/user.model'
import _ from 'lodash'

// @desc create a new user
// @route POST /api/users
// @access public

export const createUser = async (req: Request, res: Response) => {
  try {
    //the request object is already validated before coming here
    const { email, password, phone_number } = req.body

    const checkDB = await UserModel.findOne({ email }).select('email')
    if (checkDB) {
      throw new Error('user with given email already exists')
    }

    const newUser = await UserModel.create({
      email,
      password,
      phone_number,
    })

    res.status(200).json(_.omit(newUser.toJSON(), 'password'))
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}

// @desc get current user
// @route GET /api/users/me
// @access private/admin
export const currentUser = async (_req: Request, res: Response) => {
  try {
    const user_id = res.locals.user.userId

    const currentUser = await UserModel.findById(user_id)
      .select('-password')
      .exec()

    if (!currentUser) throw new Error('User not found')

    res.json(currentUser)
  } catch (error: any) {
    res.send(error.message)
  }
}
