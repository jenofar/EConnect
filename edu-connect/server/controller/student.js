import Student from "../model/student.js";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";

const register=async(req,res)=>{
    let name=req.body.name
    let rollno=req.body.rollno
    let password=req.body.password
    let department=req.body.department
    let course=req.body.course

    try {
        const edata=await Student.findOne({rollno})
        if(edata) return res.send('Roll no already registered')
        const salt_routes=10
        bcrypt.hash(password,salt_routes,async function(err,hash){
            const data=await Student.insertMany({
                name,
                rollno,
                password:hash,
                department,
                course
            })
            if(data) return res.send(data)
        })
    } catch (error) {
        return res.send(error.message)
    }
}

const login=async(req,res)=>{
    let rollno=req.body.rollno
    let pwd=req.body.password
    try {
        const data=await Student.findOne({rollno})
        if(data){
            bcrypt.compare(pwd,data.password,async function(err,result){
                if(result==true){
                    const token=jwt.sign({_id:data._id,isProf:data.isProf,isAdmin:data.isAdmin},''+process.env.SECRET)
                    return res.send(token)
                }
                return res.send('invalid password')
            })
        }
        else{
            return res.send('Please enter valid Roll number')
        }
    } catch (error) {
        return res.send(error.message)
    }
}

export {register,login}