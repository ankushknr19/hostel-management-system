import {Schema, model} from 'mongoose'


const userSchema = new Schema({
    name: Number
})

export const users = model('users', userSchema)