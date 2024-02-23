const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
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
    contact : {
      type : Number,
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
      console.log(firstName, lastName, companyName, gst, email, password, cpassword)
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
      const exists = await this.findOne({email}) //agr email exist krta h phle se hi to exist ki kush value hogi
      if(exists){
       throw Error("Email already in Use")//hm yha response use nhi kr skte
      }
      //PASSWORD HASHING K LIE bcrypt PACKAGE INSTALL KRANA PDEGA
      //to genrate salt
      const salt = await bcrypt.genSalt(10)//default value = 10
      const hash1 = await bcrypt.hash(password, salt)
      const hash2 = await bcrypt.hash(cpassword, salt)
      //
   
      //password hashing ho gyi ab document jo save hogi db m use bnaye
      const user = await this.create({firstName, lastName, companyName,gst,email, password : hash1, cpassword : hash2})
   
      return user
}


module.exports = mongoose.model("SignupUser" , userSchema)


