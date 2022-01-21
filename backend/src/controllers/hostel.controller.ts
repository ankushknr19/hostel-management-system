import {Request, Response} from 'express'
import { UserModel } from '../models/user.model'

// @desc create a new hostel
// @route POST /api/hostels
// @access private

export const createHostel = async(req: Request, res: Response) => {
    try {
        const user_id = req.params.id
        const user = await UserModel.findOne({_id: user_id})
        if(!user){
           throw new Error('user not found')
        }

       const {name, district, city, ward, street} = req.body
    
       if(!(name && district && city && ward)){
          throw new Error ('some fields are missing')
       }
       
       user.hostel = {
        name,
        address: {  
           district,
           city,
           ward,
           street
        }
        }
        await user.updateOne({ _id: user_id }, { '$set': { hostel: { name, address: { district, city, ward, street } } }}, {new:true, runValidator: true })
        await user.save()
  
       res.status(200).json({success: true, hostel: user.hostel})
        
    } catch (error: any) {
       res.status(404).send(error.message)
    }
 }