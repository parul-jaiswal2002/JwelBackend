const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    customerId : {
        type : String,
        unique : true
    },
    customerName: {
        type : String
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    companyName : {
        type : String
    },
    gst : {
        type : Number
    },
    email : {
        type : String,
        unique : true
    },
    contact : {
        type : Number
    },
    userName : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    user_id : {
        type : String,
        required : true
    }

}, {timestamps: true})

module.exports = mongoose.model('Company', CompanySchema)