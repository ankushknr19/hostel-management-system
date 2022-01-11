import mongoose from 'mongoose'

const mongoURL = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.5oy9u.mongodb.net/hostel-app?retryWrites=true&w=majority"

export function connectDB() {
    mongoose.connect(mongoURL)

    mongoose.connection
        .once('open', ()=> console.log('database connected successfully'))
        .on('error', (err)=> console.error('error',err))

    mongoose.set('debug', true)
}