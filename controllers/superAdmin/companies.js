require("dotenv").config() 
const Company = require('../../models/superAdmin/companies');
const SignupUser = require('../../models/signup')
const jwt = require('jsonwebtoken')


//create token method
const createToken = (_id) => {   
   return jwt.sign({_id } , process.env.SECRET, {expiresIn : '3d'})
}

const getAllCompanies = async (req, res) => {
    const companies = await Company.find({}).sort({createdAt : -1});
    res.status(200).json(companies)
}

const createCompany = async (req, res) => {
    const {customerId, customerName, firstName, lastName,companyName,  gst, email, contact,userName, password} = req.body;
    try{
        const user_id = req.admin._id;
        let cpassword = password
        const companySignup = await SignupUser.signup(firstName, lastName, companyName,gst,email,password,cpassword)
        if(companySignup){
            
            const token = createToken(companySignup._id)
            const company = await Company.create({customerId, customerName,firstName, lastName, gst, email, contact,userName, password, user_id}) //to make it synchronus
            res.status(200).json({company, token}) 
        }
       if(!companySignup){
        res.status(400).json("some server error")
       }
        
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

const deleteCompany = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await Company.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Company"})
    }
    res.status(200).json(inventory)
}

module.exports = {
    getAllCompanies,
    createCompany,
    deleteCompany
}