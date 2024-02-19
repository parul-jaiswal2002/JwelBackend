const LoginUser = require('../models/login')
const SignupUser = require('../models/signup')
const jwt = require('jsonwebtoken')


//create token method
const createToken = (_id) => {   
   return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'})
}

//for login
const loginUser = async (req,res) => {
    const {email, password} = req.body
    console.log(email,password)
    try {
        const user = await LoginUser.login(email,password)
        
        //create token
        const token = createToken(user._id)
        const userInfo = {
         _id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         companyName : user.companyName,
         gst : user.gst,
         email: user.email,
         // Add other fields you want to send
        };
        res.status(200).json({user:userInfo, token})
     }
     catch(error){
        res.status(400).json({error  : error.message})
     }
    
}

//for sign up
const signUpUser = async (req, res) => {
    const {firstName, lastName, companyName, gst,email, password, cpassword } = req.body;

    console.log(firstName, lastName, companyName,gst,email,password,cpassword)
    try {
       const user = await SignupUser.signup(firstName, lastName, companyName, gst,email, password, cpassword)

       //create token
       const token = createToken(user._id)
       const userInfo = {
         _id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         companyName : user.companyName,
         gst : user.gst,
         email: user.email,
         // Add other fields you want to send
        };
       res.status(200).json({user:userInfo, token}) 
    }
    catch(error){
       res.status(400).json({error  : error.message})
    }
}

module.exports = {
    loginUser,
    signUpUser
}

