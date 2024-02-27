const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
    name : {
        type : String,
        required :true
    },
    companyName : {
        type : String
    },
    gst : {
        type : Number
    },
    email: {
        type : String,
        unique : true,
        required : true
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

module.exports = mongoose.model('Agent', agentSchema)