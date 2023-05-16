// import Event from "../model/events.js";

// const addEvent=async(req,res)=>{
//     let _id=req.user._id
//     let message=req.body.message
//     try {
//         const event=new Event({user:_id,message})
//         await event.save()
//         return res.send(event)
//     } catch (error) {
//         return res.send(error.message)
//     }
// }

// export{addEvent}