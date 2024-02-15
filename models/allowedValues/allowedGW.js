const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllowedValueSchema = new Schema({
    value: {
        type: Number,
        unique: true
    }
});

const AllowedGW = mongoose.model('AllowedGW', AllowedValueSchema);

module.exports = AllowedGW;