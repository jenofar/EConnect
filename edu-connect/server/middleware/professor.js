import jwt from 'jsonwebtoken'

function professor(req,res,next){
    if(req.user.isProf==false) return res.send('Only Professor can access')
    next()
}

export default professor