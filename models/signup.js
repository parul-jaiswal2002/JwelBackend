const mongoose = require('mongoose')


const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    companyName : {
        type : String,
        required : true,
    },
    gst : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true 

    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true,
    }
})

userSchema.statics.signup = async function (firstName, lastName, companyName,gst,email,password,cpassword) {
      //validation
      if(!firstName || !lastName || !companyName || !gst || !email || !password || !cpassword){
        throw Error('All fields are mandatory')
      }
      if(!validator.isEmail(email)){
        throw Error('Email is not valid')
      }
      if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
      }
      if(password !== cpassword){
        throw Error("Password and Confirm Password don't match.")
      }

   const exists = await this.findOne({email}) 
   if(exists){
    throw Error("Email already in Use")
   }
   
   const user = await this.create({firstName, lastName, companyName,gst,email,password,cpassword})

   return user
}


module.exports = mongoose.model("SignupUser" , userSchema)


