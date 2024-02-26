const mongoose = require('mongoose');
const AllowedItems = require('./allowedValues/allowedItems')
// const AllowedItemCodes = require('./allowedValues/allowedItemCodes')
const AllowedDia1 = require('./allowedValues/allowedDia1')
const AllowedDia2 = require('./allowedValues/allowedDia2')
const AllowedGW = require('./allowedValues/allowedGW')
const User = require('./signup')
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    
    item: {
            type: String,
            required: true,
            validate: {
                validator: async function(value) {
                    const allowedValues = await AllowedItems.find({}, 'value');
                    return allowedValues.map(item => item.value).includes(value);
                },
                message: props => `${props.value} is not a valid value for item!`
            }
    },
    
    itemCode : {
        type: String,
        required: true,
        // validate: {
        //     validator: async function(value) {
        //         const allowedValues = await AllowedItemCodes.find({}, 'value');
        //         return allowedValues.map(item => item.value).includes(value);
        //     },
        //     message: props => `${props.value} is not a valid value for item!`
        // }
    },
    dia1: {
        type: Number,
        validate: {
            validator: async function(value) {
                const allowedValues = await AllowedDia1.find({}, 'value');
                return allowedValues.map(item => item.value).includes(value);
            },
            message: props => `${props.value} is not a valid value for item!`
        },
    },
    dia2: {
        type: Number,
        validate: {
            validator: async function(value) {
                const allowedValues = await AllowedDia2.find({}, 'value');
                return allowedValues.map(item => item.value).includes(value);
            },
            message: props => `${props.value} is not a valid value for item!`
        },
    },
    col1 : {
        type: String,
        validate: {
            validator: function(value) {
                return ['EM', 'RU', 'BS', 'HD', 'POK', 'TU', 'others'].includes(value);
            },
            message: props => `${props.value} is not a valid value for dia1!`
        },
    },
    col2 : {
        type: String,
        validate: {
            validator: function(value) {
                return ['EM', 'RU', 'BS', 'HD', 'POK', 'TU', 'others'].includes(value);
            },
            message: props => `${props.value} is not a valid value for dia1!`
        },
    },
    col1W : {
       type : Number,
    },
    col2W : {
       type : Number,
    },
    gold : {
        type : String,
        validate: {
            validator: function(value) {
                return ['14k', '18k'].includes(value);
            },
            message: props => `${props.value} is not a valid value for dia1!`
        },
        required: true
    },
    gw : {
        type : Number,
        validate: {
            validator: async function(value) {
                const allowedValues = await AllowedGW.find({}, 'value');
                return allowedValues.map(item => item.value).includes(value);
            },
            message: props => `${props.value} is not a valid value for item!`
        },
    },
    makingCharges :{
        type : Number
    },
    image : {
        type : String
    },
    qnty : {
       type : Number
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required : true
     }
}, {timestamps: true})

// Create a compound index
inventorySchema.index({ itemCode: 1, user_id: 1 }, { unique: true });


module.exports = mongoose.model('Inventory', inventorySchema)