import { createUser, allUsers, aUser } from './../controllers/user.controller'
import express from 'express'
import validate from '../middlewares/validateResource'
import { createUserSchema } from '../schemas/user.schema'

const router = express.Router()

router.route('/')
    .post(validate(createUserSchema), createUser)
    .get(allUsers)

    
router.route('/:id')
    .get(aUser)

export default router
