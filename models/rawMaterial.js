const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rawMaterialSchema = new Schema({
    
    item: {
        type: String,
        required: true
    },
    weight : {
        type : Number,
    },
    purity : {
        type : Number,
    },
    user_id : {
        type : String,
        required : true
     }
}, {timestamps: true})


module.exports = mongoose.model('Raw-Material', rawMaterialSchema)