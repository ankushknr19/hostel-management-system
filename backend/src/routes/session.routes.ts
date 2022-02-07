import express from 'express'
import { createSession, getSession } from '../controllers/session.controller'
import { requireUser } from '../middlewares/requireUser'
import validate from '../middlewares/validateResource'
import { createSessionSchema } from '../schemas/session.schema'

const router = express.Router()

router
  .route('/')
  .post(validate(createSessionSchema), createSession)
  .get(requireUser, getSession)

export default router
