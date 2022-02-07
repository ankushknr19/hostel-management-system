<<<<<<< HEAD
import { Request, Response } from 'Express'
import { UserModel } from '../models/user.model'
import _ from 'lodash'

// @desc create a new user
// @route POST /api/users
// @access public

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, phone_number } = req.body

    if (!(email && password && phone_number)) {
      throw new Error('all fields are required')
    }

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

// @desc validate password
// @route POST /api/...
// @access private/user

export const validatePassword = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return _.omit(user.toJSON(), 'password')
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
    res.status(200).json(users)
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

    res.status(200).json(user)
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}
=======
import {Request, Response} from 'Express'
import { UserModel } from "../models/user.model"

// @desc register a new user
// @route POST /api/users
// @access public


export const createUser = async(req: Request, res: Response) => {
    try {
       const {email, password, phone_number} = req.body
    
       if(!(email && password && phone_number)){
          throw new Error ('all fields are required')
       }
       
       const checkDB = await UserModel.findOne({email})
       if(checkDB){
          throw new Error('user with given email already exists')
       }
 
       const newUser =  await UserModel.create(
             {
                 email,
                 password,
                 phone_number
             }
          )
  
       res.status(200).json(
           {
               success: true,
               newUser
            }
        )   
        
    } catch (error: any) {
       res.status(404).send(error.message)
    }
 }

 
 // @desc get all users
// @route GET /api/users
// @access private/admin

export const allUsers = async(_req: Request, res: Response) => {
   try {
      const users = await UserModel.find().exec()
      if(!users){
         throw new Error('users not found')
      }
      res.status(200).json(users)
      
   } catch (error: any) {
      res.status(404).send(error.message)
   }
}
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
