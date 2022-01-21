import {Request, Response} from 'Express'
import { HostelerModel } from "../models/hosteler.model"

// @desc register a new user
// @route POST /api/users
// @access private/user


export const createHosteler = async(req: Request, res: Response) => {
    try {
       const {} = req.body
    
       if(!( )){
          throw new Error ('all fields are required')
       }
       
       const checkDB = await HostelerModel.findOne({})
       if(checkDB){
          throw new Error('hosteler with given email already exists')
       }
 
       const newHosteler =  await HostelerModel.create(
             {
                 
             }
          )
  
       res.status(200).json(
           {
               success: true,
               newHosteler
            }
        )   
        
    } catch (error: any) {
       res.status(404).send(error.message)
    }
 }