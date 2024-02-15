const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllowedValueSchema = new Schema({
    value: {
        type: String,
        unique: true
    }
});

const AllowedItems = mongoose.model('AllowedItem', AllowedValueSchema);

module.exports = AllowedItems;