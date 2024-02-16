const mongoose = require('mongoose');
const AllowedItems = require('../models/allowedValues/allowedItems')
const AllowedDia1 = require('../models/allowedValues/allowedDia1')
const AllowedDia2 = require('../models/allowedValues/allowedDia2')
const AllowedGW = require('../models/allowedValues/allowedGW')
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
            unique :true,
    },
    dia1: {
        value : {
            type: Number,
            validate: {
                validator: async function(value) {
                    const allowedValues = await AllowedDia1.find({}, 'value');
                    return allowedValues.map(item => item.value).includes(value);
                },
                message: props => `${props.value} is not a valid value for item!`
            },
        },
        rate : Number
    },
    dia2: {
        value : {
            type: Number,
            validate: {
                validator: async function(value) {
                    const allowedValues = await AllowedDia2.find({}, 'value');
                    return allowedValues.map(item => item.value).includes(value);
                },
                message: props => `${props.value} is not a valid value for item!`
            },
        },
        rate : Number
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
       weight : String,
       rate : Number
    },
    col2W : {
       weight : String,
       rate : Number
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
        value : {
            type : Number,
            validate: {
                validator: async function(value) {
                    const allowedValues = await AllowedGW.find({}, 'value');
                    return allowedValues.map(item => item.value).includes(value);
                },
                message: props => `${props.value} is not a valid value for item!`
            },
        },
        rate : Number
    },
    image : {
        type : String
    }
}, {timestamps: true})

module.exports = mongoose.model('Inventory', inventorySchema)