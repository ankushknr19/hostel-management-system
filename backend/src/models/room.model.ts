import mongoose, {Schema, Types} from 'mongoose'

export interface RoomDocument {
    buildingId: Number
    floor: Number
    roomId: String
    capacity: Number
    hostelers: [{id: Types.ObjectId, name: String, contact: Number}]
    createdAt: Date
    updatedAt: Date
}

const roomSchema: Schema = new Schema<RoomDocument>({

    buildingId: {type: Number, required: true},
    floor: {type: Number, required: true},
    roomId: {type: String, required: true},
    capacity: {type: String, required: true},
    hostelers: {type: [{id: Schema.Types.ObjectId, name: String, contact: Number}]}
}, {timestamps: true}
)


export const RoomModel =  mongoose.model<RoomDocument>('Room', roomSchema)