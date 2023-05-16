import Professor from "../model/professor.js";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";

const register=async(req,res)=>{
    let name=req.body.name
    let staff_id=req.body.staff_id
    let password=req.body.password
    let department=req.body.department
    let skills=req.body.skills
    console.log(skills);
    try {
        const edata=await Professor.findOne({staff_id})
        if(edata) return res.send('staff_id already registered')
        const salt_routes=10
        bcrypt.hash(password,salt_routes,async function(err,hash){
            const data=await Professor.insertMany({
                name,
                staff_id,
                password:hash,
                department,
                skills
            })
            if(data) return res.send(data)
        })
       
    } catch (error) {
        return res.send(error.message)
    }
}

const login=async(req,res)=>{
    let staff_id=req.body.staff_id
    let pwd=req.body.password
    try {
        const data=await Professor.findOne({staff_id})
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