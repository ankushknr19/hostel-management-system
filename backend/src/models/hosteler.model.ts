import { Schema, model } from 'mongoose'

const hostelerSchema = new Schema(
  {
    building_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      district: {
        type: String,
        required: true,
      },
      municipal: {
        type: String,
        required: true,
      },
      ward_number: {
        type: Number,
        required: true,
      },
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    college: {
      type: String,
    },
    guardian: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    room: {
      building_number: {
        type: String,
        required: true,
      },
      room_number: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
)

export const HostelerModel = model('Hosteler', hostelerSchema)
