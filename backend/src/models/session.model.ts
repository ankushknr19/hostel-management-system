import { model, Schema, Document } from 'mongoose'
import { UserDocument } from './user.model'

export interface SchemaDocument extends Document {
  user: UserDocument['_id']
  valid: boolean
  createdAt: Date
  updatedAt: Date
}

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const SessionModel = model<SchemaDocument>('Session', SessionSchema)
