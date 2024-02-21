const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllowedStoneSchema = new Schema({
    value: {
        type: String,
        unique: true
    }
});

const AllowedSemiPrecious = mongoose.model('AllowedSemiPreciousStone', AllowedStoneSchema);

module.exports = AllowedSemiPrecious;