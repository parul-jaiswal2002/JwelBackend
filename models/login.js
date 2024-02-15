const mongoose = require('mongoose')
const SignupUser = require('./signup')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    }
})


//static login method
userSchema.statics.login = async function (email, password){

  if(!email || !password){
    throw Error('All fields are mandatory')
  }
  //check if user exists or not
  const user = await SignupUser.findOne({email})

  if(!user){
   throw Error("Incorrect email")
  }
  
  //after checking email, check password is correct or not
  // const match = await bcrypt.compare(password, user.password)
  const match = password == user.password ? true : false;

  if(!match){
    throw Error ("Incorrect Password")
  }

  return user
}


module.exports = mongoose.model("LoginUser" , userSchema)


