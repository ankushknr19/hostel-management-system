import express from 'express'
import { createBuilding } from '../controllers/building.controller'
import { requireUser } from '../middlewares/requireUser'

const router = express.Router()

router.route('/').post(requireUser, createBuilding)

export default router
