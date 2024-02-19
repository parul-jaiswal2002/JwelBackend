const mongoose = require('mongoose')
const SignupUser = require('./signup')
const bcrypt = require('bcrypt')

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
    //phle check krenge email or password ki kuch value bhi dali gyi h ya nhi
    if(!email || !password){
    throw Error('All fields are mandatory')
    }
    //ab hm jo email h use database m search krenge
    const user = await SignupUser.findOne({email})
    if(!user){
    throw Error("Incorrect Email")
    }
    //ab mana user mil gya
    //ab hm dono password ko compare(built-in) krenge
    const match = await bcrypt.compare(password, user.password)//plain password jo abi abhi user ne dala or user.password hash h jo signup k time dala tha
    //it returns true or false
    if(!match){
    throw Error ("Incorrect Password")
    }

    return user
}


module.exports = mongoose.model("LoginUser" , userSchema)


