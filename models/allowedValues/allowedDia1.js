const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllowedValueSchema = new Schema({
    value: {
        type: Number,
        unique: true
    }
});

const AllowedDia1 = mongoose.model('AllowedDiameter1', AllowedValueSchema);

module.exports = AllowedDia1;