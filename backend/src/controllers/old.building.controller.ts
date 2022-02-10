import { Request, Response } from 'express'
import { HostelerModel } from '../models/hosteler.model'

// @desc create a new hostel
// @route PATCH /api/hostels/:id?building=true
// @access private

export const createBuilding = async (req: Request, res: Response) => {
  try {
    const hostelId = req.params.id
    if (!req.query.building) {
      throw new Error('building missing in url')
    }
    const { buildingId, name, district, city, ward, street } = req.body

    const hostel = await HostelerModel.findById(hostelId)
    if (!hostel) {
      throw new Error('hostel does not exist')
    }

    await hostel.building.push({
      buildingId,
      address: {
        district,
        city,
        ward,
        street,
      },
      name,
    })

    hostel.markModified('building')
    hostel.save(function (error: any, result: any) {
      if (error) {
        res.send(error.message)
      } else {
        res.status(200).send(result)
      }
    })
    //    res.status(200).send(`Building created successfully: ${newBuilding}`)
  } catch (error: any) {
    res.status(404).json(error.message)
  }
}
