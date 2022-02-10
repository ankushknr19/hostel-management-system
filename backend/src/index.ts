import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { connectDB } from './utils/db.connect'
import userRoutes from './routes/user.routes'
import sessionRoutes from './routes/session.routes'
import hostelRoutes from './routes/hostel.routes'
import buildingRoutes from './routes/building.routes'
import roomRoutes from './routes/room.routes'
import { deserialzeUser } from './middlewares/deserializeUser'

dotenv.config()
const app = express()

app.use(express.json())
app.use(deserialzeUser)

connectDB()

app.use('/api/users', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/hostels', hostelRoutes)
app.use('/api/buildings', buildingRoutes)
app.use('/api/rooms', roomRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send(`api is running...`)
})

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`)
})
