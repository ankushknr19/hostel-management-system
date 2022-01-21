import { createUser, allUsers } from './../controllers/user.controller';
import express from 'express'

const router = express.Router()

router.route('/').post(createUser)
                 .get(allUsers)

export default router