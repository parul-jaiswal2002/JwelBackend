const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AllowedSemiPrecious = require('../allowedValues/allowedSemiPrecious')


const semiPreciousStone = new Schema({
    
    item: {
        type: String,
        required: true,
        validate: {
            validator: async function(value) {
                const allowedValues = await AllowedSemiPrecious.find({}, 'value');
                return allowedValues.map(item => item.value).includes(value);
            },
            message: props => `${props.value} is not a valid value for item!`
        }
    },
    weight : {
        type : Number,
    },
    shape : {
        type : String,
        validate: {
            validator: function(value) {
                return ['Cabochon Cut', 'Buff-Top','Round Brilliant-Cut', 'Oval Cut', 'Baguette Cut','Beads','cabochons', 'Princess Cut', 'Pear Cut', 'Emerald Cut','Octagon Cut','Cushion Cut','Marquise Cut', 'Briolette', 'Heart Shape Cut', 'Trilliant Cut','Millennium Cut' ].includes(value);
            },
            message: props => `${props.value} is not a valid value for shape!`
        },
    },
    size : {
        type : String
    },
    user_id : {
        type : String,
        required : true
     }
}, {timestamps: true})


module.exports = mongoose.model('Semi-Precious-Stone', semiPreciousStone)




