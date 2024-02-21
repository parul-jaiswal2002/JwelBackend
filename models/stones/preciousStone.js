const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preciousStone = new Schema({
    
    item: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return ['Blue Sapphire (Neelam)', 'Yellow Sapphire (Pukhraj)','Ruby (Manik)', 'Emerald (Panna)', 'Diamond (Heera)', 'Pearl (Moti)'].includes(value);
            },
            message: props => `${props.value} is not a valid value for item`
        },
    },
    weight : {
        type : Number,
    },
    shape : {
        type : String,
        validate: {
            validator: function(value) {
                return ['Cabochon Cut', 'Buff-Top','Round Brilliant-Cut', 'Oval Cut', 'Baguette Cut', 'Princess Cut','Beads','cabochons', 'Pear Cut', 'Emerald Cut','Octagon Cut','Cushion Cut','Marquise Cut', 'Briolette', 'Heart Shape Cut', 'Trilliant Cut','Millennium Cut' ].includes(value);
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


module.exports = mongoose.model('Precious-Stone', preciousStone)




