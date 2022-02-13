import express from 'express'
import {
  createSession,
  deleteSession,
  getSession,
  reissueAccessToken,
} from '../controllers/session.controller'
import { requireUser } from '../middlewares/requireUser'
import { validate } from '../middlewares/validateResource'
import { createSessionSchema } from '../schemas/session.schema'

const router = express.Router()

router
  .route('/')
  .post(validate(createSessionSchema), createSession)
  .get(requireUser, getSession)
  .delete(requireUser, deleteSession)

router.route('/refreshtoken').post(requireUser, reissueAccessToken)

export default router
