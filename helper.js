import { client } from "./index.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

async function DeleteuserdetailbyId(id) {
    return await client
      .db("todo")
      .collection("userdetail")
      .deleteOne({ _id: ObjectId(id) });
  }
  async function UpdateuserDetailById(id, data) {
    return await client
      .db("todo")
      .collection("userdetail")
      .updateOne({ _id: ObjectId(id) }, { $set: data });
  }
  async function CreateUserDetail(data) {
    return await client.db("todo").collection("userdetail").insertOne(data);
  }
  
  async function GetdetailById(id) {
    return await client
      .db("todo")
      .collection("userdetail")
      .findOne({ _id: ObjectId(id) });
  }
  async function CreateUser(data) {
    return await client.db("todo").collection("users").insertOne(data);
  }
  async function Getuserbyname(email) {
    return await client
      .db("todo")
      .collection("users")
      .findOne({ email: email });
  }
  
  async function Getdetail(){
    return client.db("todo").collection("userdetail").find().toArray();
  }
  async function genpassword(password) {
    const no_of_round = 10;
    const salt = await bcrypt.genSalt(no_of_round);
    console.log(salt);
    const hashedpassword = await bcrypt.hash(password, salt);
    console.log(hashedpassword);
    return hashedpassword;
  }
  
  export {
    GetdetailById,
    CreateUserDetail,
    UpdateuserDetailById,
    DeleteuserdetailbyId,
    genpassword,
    CreateUser,
    Getuserbyname,
    Getdetail
  };
  