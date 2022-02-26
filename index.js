import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { DetailRouter } from "./routes/details.js";
import { UserRouter } from "./routes/user.js";


dotenv.config();//dotenv configiration//

const app=express();

const PORT=process.env.PORT;//PORT Number//

app.use(cors()); //third party middleware used to access data//

app.use(express.json());//middleware to convert data into json format//

const MONGO_URL=process.env.MONGO_URL;//MongoDb URL//

async function Connection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDb Connected")
    return client
}
export const client=await Connection();

app.get("/",(request,response)=>{
    response.send("Hello world")
})

app.use("/details",DetailRouter)
app.use("/user",UserRouter)

app.listen(PORT,()=>console.log("App running in",PORT))