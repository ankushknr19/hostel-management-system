import { RoomModel } from './../models/room.model';
import {Request, Response} from 'express'

// @desc get all rooms
// @route GET /api/rooms
// @access private

export const allRooms = async(_req: Request, res: Response) => {
   try {
      const rooms = await RoomModel.find()
      if(!rooms){
         throw new Error('rooms not found')
      }
      res.status(200).json(rooms)
      
   } catch (error: any) {
      res.status(404).send(error.message)
   }
}

// @desc get a room
// @route GET /api/rooms/:id?building=buildingId
// @access private

export const aRoom = async(req: Request, res: Response) => {
   try {
      const roomId  = req.params.id
      const buildingId = req.query.building
      
      if(!buildingId){
         throw new Error('building id not provided')
      }

      const room = await RoomModel.findOne({buildingId: buildingId, roomId: roomId})

      if(!room){
         throw new Error('room not found')
      }

      res.status(200).json(room)
      
   } catch (error: any) {
      res.status(404).send(error.message)
   }
}

// @desc create a new room
// @route POST /api/rooms
// @access private

export const createRoom = async(req: Request, res: Response) => {
   try {
      const {buildingId, floor, roomId, capacity} = req.body
   
      if(!(buildingId && floor && roomId && capacity)){
         throw new Error ('all fields are required')
      }
      
      const checkDB = await RoomModel.findOne({buildingId, roomId})
      if(checkDB){
         throw new Error('room already exists')
      }

      const newRoom =  await RoomModel.create(
            {
                buildingId: buildingId,
                floor: floor,
                roomId: roomId,
                capacity: capacity
            }
         )
 
      res.status(200).send(newRoom)   
       
   } catch (error: any) {
      res.status(404).send(error.message)
   }
}
