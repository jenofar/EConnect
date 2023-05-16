import express from 'express'
import { addquery, addrating, addreply, getQueries } from '../controller/query.js'
import auth from '../middleware/auth.js'
import professor from '../middleware/professor.js'

const route=express.Router()

route.post('/add',auth,addquery)
route.post('/addreply',auth,addreply)
route.post('/addrating',auth,addrating)
route.get('/',getQueries)

export default route