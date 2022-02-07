import { allRooms, aRoom, createRoom } from '../controllers/room.controller';
 import express from 'express'


const router = express.Router()

router.route('/').get(allRooms)
                .post(createRoom)  

router.route('/:id').get(aRoom)

export default router