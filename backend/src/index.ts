import dotenv from 'dotenv';
import express, {Request, Response} from "express"
import {connectDB} from './utils/db.connect'
import roomRoutes from './routes/room.routes'
import userRoutes from './routes/user.routes'
import hostelRoutes from './routes/hostel.routes'

dotenv.config()
const app = express()

app.use(express.json())

connectDB()

app.use('/api/rooms', roomRoutes)
app.use('/api/users', userRoutes)
app.use('/api/hostel', hostelRoutes)


app.get('/',(_req: Request, res: Response)=>{
 res.status(200).send("api is running...")
})


const { PORT } = process.env

app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})