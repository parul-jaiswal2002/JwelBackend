const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rawMaterialSchema = new Schema({
    
    item: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return ['Gold', 'Silver'].includes(value);
            },
            message: props => `${props.value} is not a valid value for dia1!`
        },
    },
    weight : {
        type : Number,
    },
    user_id : {
        type : String,
        required : true
     }
}, {timestamps: true})


module.exports = mongoose.model('Raw-Material', rawMaterialSchema)