const SuperAdmin = require('../../models/superAdmin/superAdmin')

const jwt = require('jsonwebtoken')


//to create token
const createToken = (_id) => {   
    return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'})
 }
 
 
 //for login
 const loginAdmin = async (req,res) => {
     const {email, password} = req.body
     try {
         if(email && password){
            const admin = await SuperAdmin.login(email,password)
            //it will return that user from static login function
    
            //creating token with the help of id
            const token = createToken(admin._id)
            const adminInfo = {
               _id: admin._id,
               firstName: admin.firstName,
               lastName: admin.lastName,
               companyName : admin.companyName,
               gst : admin.gst,
               email: admin.email,
               // Add other fields you want to send
              };
            res.status(200).json({admin : adminInfo, token})
         }
         else{
            res.status(401).json({error : 'Incorrect details'})
         }
      }
      catch(error){
         res.status(400).json({error  : error.message})
      }
     
 }
 
 
 
 //for sign up
 const signUpAdmin = async (req, res) => {
     const {firstName, lastName, contact,email, password , cpassword} = req.body;
     
     try {
        const admin = await SuperAdmin.signup(firstName, lastName, contact,email, password , cpassword)
 
        
        const token = createToken(admin._id)
        const adminInfo = {
         _id: admin._id,
         firstName: admin.firstName,
         lastName: admin.lastName,
         companyName : admin.companyName,
         gst : admin.gst,
         email: admin.email,
         // Add other fields you want to send
        };
        res.status(200).json({admin : adminInfo, token}) 
     }
     catch(error){
        res.status(400).json({error  : error.message})
     }
 }
 
 module.exports = {
     loginAdmin,
     signUpAdmin
 }