const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the first model
const camAnd3dSchema = new Schema({
    image : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
    },
    status : {
        type : String,
        required : true
    },
    user_id : {
        type : String,
        required : true
    }
});

// Define the schema for the second model
const castingSchema = new Schema({
    image : {
        type : String,
        required : true
    },
    material : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date
    },
    status : {
        type : String,
        required : true
    },
    user_id : {
        type : String,
        required : true
    }
});

const stoneSetting = new Schema({
    image : {
        type : String,
        required : true
    },
    material : {
        type : String,
        required : true
    },
    stoneOrDiamond : {
        type : String
    },
    qnty : {
        type : Number,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date
    },
    status : {
        type : String,
        required : true
    },
    user_id : {
        type : String,
        required : true
    }
})

// Create models from the schemas
const CamAnd3d = mongoose.model('Cam & 3dPrint', camAnd3dSchema);
const Casting = mongoose.model('Casting', castingSchema);
const StoneSetting = mongoose.model('StoneSetting', stoneSetting);

// Export the models
module.exports = {
    CamAnd3d,
    Casting,
    StoneSetting
};