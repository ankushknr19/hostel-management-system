import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { mongoCompassURI } = process.env

export function connectDB() {
    
    const dbURI: string = mongoCompassURI || ''
    mongoose.connect(dbURI)

    mongoose.connection
        .once('open', ()=> console.log('database connected successfully'))
        .on('error', (err)=> console.error('error',err))

    mongoose.set('debug', true)
}