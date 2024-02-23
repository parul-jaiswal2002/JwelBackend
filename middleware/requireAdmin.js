const jwt = require('jsonwebtoken')
const Admin = require("../models/superAdmin/superAdmin")

const requireAdmin =  async (req, res, next) => {


    const {authorization} = req.headers 
    
    if(!authorization){
        return res.status(401).json({error : "Autherization token required"})
    }


    const token = authorization.split(" ")[1] 

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
   
        req.admin = await Admin.findOne({_id}).select('_id')
        console.log(req.admin)
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error : " Request is not authorized"})
    }

}

module.exports = requireAdmin