import Research from "../model/research.js";

const addresearch=async(req,res)=>{
    let topic=req.body.topic
    let description=req.body.description
    let professor_id=req.user._id
    let research_id

    try {
        const data1=await Research.find().count()
        if(data1==0) research_id='resr01'
        else{
            let rsid=await Research.findOne().sort({research_id})
            research_id=Number(rsid.research_id.slice(4))+1
            research_id='resr0'+JSON.stringify(research_id)
        }
        const  data=await Research.insertMany({
            topic,
            description,
            professor_id,
            research_id
        })

        return res.send(data)

    } catch (error) {
        return res.send(error.message)
    }
}

const addStudent=async(req,res)=>{
    let _id=req.user._id
    let research_id=req.body.research_id
    
    try {
        const data=await Research.findOne({research_id})
        // console.log(data1);
        data.students.push({
            student_id:_id,
            status:'initiated'
        })
        const data1=await data.save()
        return res.send(data1)
    } catch (error) {
        return res.send(error.message)
    }
}

const getresearch=async(req,res)=>{
    try {
        const data=await Research.find().populate([{path:'professor_id',select:'name'},{path:'students.student_id'}])
        return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}

export {addresearch,getresearch,addStudent}