const jwt = require('jsonwebtoken')
const User = require("../models/signup")

const requireAuth =  async (req, res, next) => {

    //for these routes i don't want any authentication
    if (req.path === '/allowed-semiPrecious' || req.path === '/allowed-items' 
        || req.path === '/allowed-itemCodes' || req.path === '/allowed-Dia1'
        || req.path === '/allowed-Dia2'       || req.path === '/allowed-GW'
    
    ) {
        return next();
    }


    const {authorization} = req.headers 
    
    if(!authorization){
        return res.status(401).json({error : "Autherization token required"})
    }


    const token = authorization.split(" ")[1] 

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
   
        req.user = await User.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error : " Request is not authorized"})
    }

}

module.exports = requireAuth 