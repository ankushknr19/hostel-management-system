import { Request, Response } from 'Express'
import { BuildingModel } from '../models/building.model'
import _ from 'lodash'
import { UserModel } from '../models/user.model'

// @desc create a new building
// @route POST /api/buildings
// @access private/user

export const createBuilding = async (req: Request, res: Response) => {
    try {
      const user_id = res.locals.user.userId
    const { building_name } = req.body

    const user = await UserModel.findOne({ user_id })
    if (!user) {
      throw new Error('user doesnot exist')
    }

    const newBuilding = await BuildingModel.create({
        user_id,
        building_name,
        hostel_name: user.hostel.name
    })

    res.status(200).json(newBuilding)
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}
