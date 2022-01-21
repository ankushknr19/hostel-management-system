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