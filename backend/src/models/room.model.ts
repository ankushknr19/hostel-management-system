import mongoose, {Schema, Types} from 'mongoose'

export interface RoomDocument {
<<<<<<< HEAD
    buildingId: Number //BuildingDocument['_id']
=======
    buildingId: Number
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
    floor: Number
    roomId: String
    capacity: Number
    hostelers: [{id: Types.ObjectId, name: String, contact: Number}]
    createdAt: Date
    updatedAt: Date
}

<<<<<<< HEAD
const roomSchema: Schema = new Schema<RoomDocument>(
  {
    buildingId: { type: Number, ref: 'User', required: true },
    floor: { type: Number, required: true },
    roomId: { type: String, required: true },
    capacity: { type: String, required: true },
    hostelers: {
      type: [{ id: Schema.Types.ObjectId, name: String, contact: Number }],
    },
  },
  { timestamps: true }
=======
const roomSchema: Schema = new Schema<RoomDocument>({

    buildingId: {type: Number, required: true},
    floor: {type: Number, required: true},
    roomId: {type: String, required: true},
    capacity: {type: String, required: true},
    hostelers: {type: [{id: Schema.Types.ObjectId, name: String, contact: Number}]}
}, {timestamps: true}
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
)


export const RoomModel =  mongoose.model<RoomDocument>('Room', roomSchema)