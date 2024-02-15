const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//create token method
const createToken = (_id) => {   
   return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'})
}

//for login
const loginUser = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email,password)
        
        //create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
     }
     catch(error){
        res.status(400).json({error  : error.message})
     }
    
}

//for sign up
const signUpUser = async (req, res) => {
    const {email, password } = req.body;
    console.log(email, password)
    try {
       const user = await User.signup(email,password)

       //create token
       const token = createToken(user._id)
       res.status(200).json({email, token}) 
    }
    catch(error){
       res.status(400).json({error  : error.message})
    }
}

module.exports = {
    loginUser,
    signUpUser
}

