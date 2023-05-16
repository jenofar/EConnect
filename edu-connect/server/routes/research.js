import express from "express";
import { addresearch, addStudent, getresearch } from "../controller/research.js";
import auth from "../middleware/auth.js";
const route=express.Router()

route.post('/add',auth,addresearch)
route.get('/',getresearch)
route.post('/join',auth,addStudent)

export default route