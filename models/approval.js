const mongoose = require('mongoose');
const User = require('./signup')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    priceNumber: {
        type: Number,
        required: true
    },
    item : {
        type : String,
    },
    itemCode : {
        type : String,
    },
    dia1 : {
        type : String,
    },
    dia2 : {
        type : String,
    },
    col1 : {
        type : String,
    },
    col2 : {
        type : String,
    },
    gw : {
        type : Number,
    },
    
});

const approvalSchema = new Schema({
    partyName: {
        type: String,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    through: {
        type: String,
        required: true
    },
    products: [productSchema], // Array of products
    totalPrice : {
        type : Number
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required : true
    }
}, { timestamps: true });

module.exports = mongoose.model('Approval', approvalSchema);