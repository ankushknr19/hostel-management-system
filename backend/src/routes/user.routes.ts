<<<<<<< HEAD
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
=======
import { createUser, allUsers } from './../controllers/user.controller';
import express from 'express'

const router = express.Router()

router.route('/').post(createUser)
                 .get(allUsers)

export default router
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
