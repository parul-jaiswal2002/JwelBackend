const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstName : {
        type : String,
        required :true
    },
    lastName : {
        type : String,
        required : true
    },
    companyName : {
        type : String
    },
    gst : {
        type : Number,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true 
    },
    contact : {
        type : Number,
        unique : true,
        required : true
    },
    user_id : {
        type : String,
        required : true
    }
},{timestamps : true})



module.exports = mongoose.model('Client', clientSchema)