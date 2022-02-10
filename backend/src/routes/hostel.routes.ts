import express from 'express'
import { createHostel } from '../controllers/hostel.controller'
import { requireUser } from '../middlewares/requireUser'
import { validate } from '../middlewares/validateResource'
import { createHostelSchema } from '../schemas/hostel.schema'

const router = express.Router()

//put sub document 'hostel' in user collection
router.route('/').put(requireUser, validate(createHostelSchema), createHostel)

export default router
