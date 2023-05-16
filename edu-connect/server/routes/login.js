import express from "express";
import { getme, login } from "../controller/login.js";
import auth from "../middleware/auth.js";

const route=express.Router()

route.post('/login',login)
route.get('/getprof',auth,getme)

export default route