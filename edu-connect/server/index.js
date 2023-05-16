import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import student from './routes/student.js'
import professor from './routes/professor.js'
import query from './routes/query.js'
import login from './routes/login.js'
import research from './routes/research.js'
// import event from './routes/event.js'

const app=express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://0.0.0.0:27017/hackathon')
.then(()=>console.log('db connected'))
.catch((e)=>console.log('error'))

app.use('/api/v1/student',student)
app.use('/api/v1/professor',professor)
app.use('/api/v1/query',query)
app.use('/api/v1',login)
app.use('/api/v1/research',research)
// app.use('/api/v1/event',event)

app.get('/',(req,res)=>{res.send('server connected')})

const port=process.env.PORT || 3002
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})