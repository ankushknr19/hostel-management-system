import { Request, Response } from 'express'
import { UserModel } from '../models/user.model'

// @desc create a new hostel
// @route POST /api/hostels
// @access private/user

export const createHostel = async (req: Request, res: Response) => {
  try {
    const user_id = res.locals.user.userId
    const user = await UserModel.findOne({ _id: user_id }).exec()

    if (!user) {
      throw new Error('user not found')
    }

    const { name, district, city, ward, street } = req.body

    user.hostel = {
      name,
      address: {
        district,
        city,
        ward,
        street,
      },
    }

    await user.save()

    res.status(200).json({ success: true, hostel: user.hostel })
  } catch (error: any) {
    res.status(404).send(error.message)
  }
}
