import express,{Response} from "express"
import {connectDB} from './database/db.config'
import {users} from './database/schema/userSchema'
const app=express()

connectDB()

const test=async()=>{
    await users.create({name:'rajeev'})

}

test()



app.get('/',(_,res:Response)=>{
 res.status(200).send("Hello")
})


const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})