import { Schema, model, Document } from 'mongoose'
import { UserDocument } from './user.model'

export interface BuildingDocument extends Document {
  user: UserDocument['_id']
  building_name: string
  hostel_name: string
  floor_count: [
    {
      floor_number: number
    room_count: number
    }
  ]
  }

const floorSchema = new Schema(
  {
    floor_number: { type: Number },
    room_count: { type: Number },
  },
  { _id: false }
)

const buildingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    building_name: {
      type: String,
      required: true,
    },
    hostel_name: {
      type: String,
      required: true,
    },
    floor_count: [floorSchema],
  },
  { timestamps: true }
)

export const BuildingModel = model('Building', buildingSchema)
