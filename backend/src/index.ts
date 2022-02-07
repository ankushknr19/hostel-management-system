<<<<<<< HEAD
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { connectDB } from './utils/db.connect'
import roomRoutes from './routes/room.routes'
import userRoutes from './routes/user.routes'
import hostelRoutes from './routes/hostel.routes'
import sessionRoutes from './routes/session.routes'
import { deserialzeUser } from './middlewares/deserializeUser'
=======
import dotenv from 'dotenv';
import express, {Request, Response} from "express"
import {connectDB} from './utils/db.connect'
import roomRoutes from './routes/room.routes'
import userRoutes from './routes/user.routes'
import hostelRoutes from './routes/hostel.routes'
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162

dotenv.config()
const app = express()

app.use(express.json())
<<<<<<< HEAD
app.use(deserialzeUser)
=======
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162

connectDB()

app.use('/api/rooms', roomRoutes)
app.use('/api/users', userRoutes)
app.use('/api/hostel', hostelRoutes)
<<<<<<< HEAD
app.use('/api/sessions', sessionRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send(`api is running...`)
=======


app.get('/',(_req: Request, res: Response)=>{
 res.status(200).send("api is running...")
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
})

const { PORT } = process.env

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`)
})
=======
const { PORT } = process.env

app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})
>>>>>>> 3953467e58d0e36dbdf61ab30061a57f1403b162
