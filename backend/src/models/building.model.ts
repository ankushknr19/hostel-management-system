import { Schema, model } from 'mongoose'

const floorSchema = new Schema(
<<<<<<< HEAD
  {
    floor_number: { type: Number },
    room_count: { type: Number },
  },
  { _id: false }
)

const buildingSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    building_id: {
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
=======
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
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
