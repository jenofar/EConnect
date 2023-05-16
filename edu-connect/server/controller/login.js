import Student from "../model/student.js";
import Professor from "../model/professor.js";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";

const login=async(req,res)=>{
    let id=req.body.id
    let pwd=req.body.password
    console.log(id,pwd);
    try {
        const data=await Professor.findOne({staff_id:id})
        const data1=await Student.findOne({rollno:id})
        if(data){
            bcrypt.compare(pwd,data.password,async function(err,result){
                if(result==true){
                    const token=jwt.sign({_id:data._id,isProf:data.isProf,isAdmin:data.isAdmin},''+process.env.SECRET)
                    return res.send(token)
                }
                return res.send('invalid password')
            })
        }
        else if(data1){
            bcrypt.compare(pwd,data1.password,function (err,result){
                if(result==true){
                    const token=jwt.sign({_id:data1._id,isProf:data1.isProf,isAdmin:data1.isAdmin},''+process.env.SECRET)
                    return res.send(token)
                }
                return res.send('invalid password')
            })
        }
        else{
            return res.send('Please enter valid id')
        }
    } catch (error) {
        return res.send(error.message)
    }
}

const getme=async(req,res)=>{
    let _id=req.user._id
    try {
        const data=await Student.findOne({_id})
        if(data) return res.send(data)
        const data1=await Professor.findOne({_id})
        return res.send(data1)
    } catch (error) {
        return res.send(error.message)
    }
}

export {login,getme}