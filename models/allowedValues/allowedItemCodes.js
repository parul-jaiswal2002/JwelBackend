const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllowedValueSchema = new Schema({
    value: {
        type: String,
    }
});

const AllowedItemCodes = mongoose.model('AllowedItemCode', AllowedValueSchema);

module.exports = AllowedItemCodes;