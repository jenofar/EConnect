import Query from "../model/query.js";

const addquery=async(req,res)=>{
    let query=req.body.query
    let created_by=req.user._id
    let department=req.body.department
    let anonymous=req.body.anonymous
    try {
        const data=await Query.insertMany({
            query,
            created_by,
            department,
            isAnonymous:anonymous
        })
        if(data) return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}

const addreply=async(req,res)=>{
    let reply=req.body.reply
    let professor_id=req.user._id
    let _id=req.body._id
    let reply_id
    try {
        const data=await Query.findOne({_id})
        let replen=data.replies.length
        if(replen==0) reply_id='r01'
        else{
            let rid=Number(data.replies[replen-1].reply_id.slice(2))+1
            reply_id='r0'+JSON.stringify(rid)
        }
        const data1=await Query.updateMany({_id},{$set:{
            replies:[...data.replies,{
                reply,
                professor_id,
                reply_id
            }]
        }}) 
        return res.send(data1)
    } catch (error) {
        return res.send(error.message)
    }
}

const addrating=async(req,res)=>{
    let _id=req.body._id
    let reply_id=req.body.reply_id
    let rating=req.body.rating
    try {
        const data1=await Query.findOne({_id})
        const data=await Query.updateMany({_id,'replies.reply_id':reply_id},{$set:{
            'replies.$.rate':rating
        }})
        
        return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}

const getQueries=async(req,res)=>{
    try {
        const data=await Query.find().populate([{path:'created_by',select:'name'},{path:'replies.professor_id',select:'name'}])
        return res.send(data)
    } catch (error) {
        return res.send(error.message)
    }
}


export {addquery,addreply,addrating,getQueries}