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

    const checkDB = await UserModel.findOne({ email })
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

// @desc get all users
// @route GET /api/users
// @access private/admin

export const allUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find().exec()
    if (!users) {
      throw new Error('users not found')
    }

    res.status(200).json(users) //sends password !!
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}

// @desc get a user
// @route GET /api/users/:id
// @access private/admin

export const aUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id
    const user = await UserModel.findOne({ _id: user_id }).exec()

    if (!user) {
      throw new Error('user not found')
    }

    res.status(200).json(_.omit(user.toJSON(), 'password'))
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}
