import { createUser, currentUser } from './../controllers/user.controller'
import express from 'express'
import { validate } from '../middlewares/validateResource'
import { createUserSchema } from '../schemas/user.schema'
import { requireUser } from '../middlewares/requireUser'

const router = express.Router()

router.route('/').post(validate(createUserSchema), createUser)

router.route('/me').get(requireUser, currentUser)

export default router
