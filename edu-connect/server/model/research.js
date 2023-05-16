import mongoose from "mongoose";

const researchSchema=new mongoose.Schema({
    research_id:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    professor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Professor'
    },
    students:[
        {
            student_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Student'
            },
            status:{
                type:String,
                enum:['initiated','accept','decline'],
                default:'initiated'
            }
        }
    ]
})

var Research=mongoose.model("Research",researchSchema)
export default Research;