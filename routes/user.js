import express from "express";
import { genpassword, CreateUser, Getuserbyname } from "../helper.js";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

//Signup using post method//
router.post("/signup", async (request, response) => {
  const { email, password } = request.body;
  const userfromdb = await Getuserbyname(email);
  if (userfromdb) {
    response.status(401).send({ message: "Email_id already exist" });
    return;
  }
  if (password.length < 8) {
    response.status(401).send({ message: "password must be longer" });
    return;
  }
  const hashedpassword = await genpassword(password);
  const result = await CreateUser({ email, password: hashedpassword });
  response.send(result);
});

//Login using post method///
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const userfromdb = await Getuserbyname(email);
  if (!userfromdb) {
    response.status(401).send({ message: "Invalid Credentials" });
    return;
  }
  const storedpassword = userfromdb.password;
  console.log(storedpassword);
  const matchedpassword = await bcyrpt.compare(password, storedpassword);
  console.log(matchedpassword);
  if (matchedpassword) {
    const token = jwt.sign({ id: userfromdb._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    response.send({ message: "Successful Login", token: token });
  } else {
    response.send({ message: "Invalid Credentials" });
  }
});

export const UserRouter = router;