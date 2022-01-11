import express,{Response} from "express"
import {connectDB} from './config/db.config'
import {users} from './model/user.model'
const app=express()

connectDB()

const test=async()=>{
    await users.create({name:'rajeev'})

}

test()



app.get('/',(_,res:Response)=>{
 res.status(200).send("Hello from branch develop")
})


const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})