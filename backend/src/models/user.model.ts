import {Schema, model} from 'mongoose'

//sub document to nest on user schema
const hostelSchema = new Schema({
    name: {type: String, required: true},
    address: {
        district: {type: String, required: true},
        city: {type: String, required: true},
        ward: {type: String, required: true},
        street: String
    }    
},{_id: false})

const userSchema = new Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, select: false},
        phone_number: {type: Number, required: true, unique: true},
        hostel: hostelSchema //nested schema
    },
    {timestamps: true}
)

export const UserModel = model('User', userSchema)
