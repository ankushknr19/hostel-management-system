import { Schema, model } from 'mongoose'

const floorSchema = new Schema(
    {
        floor_number: {type: Number},
        room_count: {type: Number}
    },
    {_id: false}
)

const buildingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  building_id: {
    type: String,
    required: true
  },
  hostel_name: {
    type: String,
    required: true
  },
  floor_count: [floorSchema]
},
{timestamps: true}
)

export const BuildingModel = model('Building', buildingSchema)