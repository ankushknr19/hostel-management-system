import express from 'express'
import { createHostel } from '../controllers/hostel.controller'

//put sub document 'hostel' in user collection
const router = express.Router()

router.route('/:id').put(createHostel)

export default router