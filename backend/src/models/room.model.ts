import mongoose, { Schema } from 'mongoose'
import { BuildingDocument } from './building.model'
import { UserDocument } from './user.model'

export interface RoomDocument extends mongoose.Document {
  building: BuildingDocument['_id']
  floor: Number
  room_name: String
  capacity: Number
  hostelers: [
    {
      id: UserDocument['_id']
      name: String
      contact: Number
    }
  ]
  createdAt: Date
  updatedAt: Date
}

const roomSchema: Schema = new Schema<RoomDocument>(
  {
    building: { type: Schema.Types.ObjectId, ref: 'Building', required: true },
    floor: { type: Number, required: true },
    room_name: { type: String, required: true },
    capacity: { type: String, required: true },
    hostelers: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        contact: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

export const RoomModel = mongoose.model<RoomDocument>('Room', roomSchema)
