const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllowedValueSchema = new Schema({
    value: {
        type: Number,
        unique: true
    }
});

const AllowedDia2 = mongoose.model('AllowedDiameter2', AllowedValueSchema);

module.exports = AllowedDia2;