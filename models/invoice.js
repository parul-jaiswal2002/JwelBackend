const mongoose = require('mongoose');
const Inventory = require('./inventoryModel')
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceId: {
        type: String,
        unique: true,
    },
    itemCode : {
        type: String,
        required: true,
    },
    content  : {
       col1 : String,
       col2 : String,
       gold : String,
    },
    weight : {
        dia1 : String,
       dia2 : String,
       col1W : String,
       col2W : String,
       gw : Number
    },
    rate : {
        dia1 : String,
       dia2 : String,
       col1W : String,
       col2W : String,
       gw : Number
    },
    total : {
        dia1 : String,
        dia2 : String,
        col1W : String,
        col2W : String,
        gw : Number
    },
    tagNumber : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number
    },
    image : {
        type : String
    }
});

// Pre-save hook to populate content, weight, and rate based on itemCode
invoiceSchema.pre('save', async function(next) {
    try {
        // Fetch details based on itemCode (assuming there's another model for this)
        if (!this.estimateId) {
            // Generate a unique identifier for the estimate
            this.estimateId = new mongoose.Types.ObjectId().toString();
        }
        const itemDetails = await Inventory.findOne({ itemCode: this.itemCode });
        let totalPrice = (itemDetails.dia1.rate * itemDetails.dia1.value)+(itemDetails.dia2.rate * itemDetails.dia2.value)
                            +(itemDetails.col1W.rate * itemDetails.col1W.weight)+(itemDetails.col2W.rate * itemDetails.col2W.weight)
                            +(itemDetails.gw.rate * itemDetails.gw.value)
        
        //totalPrice after tag number
           totalPrice += totalPrice*(this.tagNumber)/100
        // Populate fields if details are found
        if (itemDetails) {
            this.content = {
                col1: itemDetails.col1,
                col2: itemDetails.col2,
                gold: itemDetails.gold
            };
            this.weight = {
                dia1: itemDetails.dia1.value,
                dia2: itemDetails.dia2.value,
                col1W: itemDetails.col1W.weight,
                col2W: itemDetails.col2W.weight,
                gw: itemDetails.gw.value
            };
            this.rate = {
                dia1: itemDetails.dia1.rate,
                dia2: itemDetails.dia2.rate,
                col1W: itemDetails.col1W.rate,
                col2W: itemDetails.col2W.rate,
                gw: itemDetails.gw.rate
            };
            this.total = {
                dia1: itemDetails.dia1.rate * itemDetails.dia1.value,
                dia2: itemDetails.dia2.rate * itemDetails.dia2.value,
                col1W: itemDetails.col1W.rate * itemDetails.col1W.weight,
                col2W: itemDetails.col2W.rate * itemDetails.col2W.weight,
                gw: itemDetails.gw.rate * itemDetails.gw.value
            };
            this.totalPrice  = totalPrice;
            this.image = itemDetails.image ? itemDetails.image : 'No image'
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);