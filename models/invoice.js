const mongoose = require('mongoose');
const Inventory = require('./inventoryModel')
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    makerName : {
        type : String,
        required : true
    },
    grossWeight : {
        type : Number,
        required : true
    },
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
        dia1 : Number,
       dia2 : Number,
       col1W : Number,
       col2W : Number,
       gw : Number
    },
    rate : {
        dia1 : Number,
       dia2 : Number,
       col1W : Number,
       col2W : Number,
       gw : Number
    },
    total : {
        dia1 : Number,
        dia2 : Number,
        col1W : Number,
        col2W : Number,
        gw : Number,
        makingCharges : Number
    },
    tagNumber : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number
    },
    makingCharges : {
        type : Number
    },
    image  : {
        type : String
    }
});

// Pre-save hook to populate content, weight, and rate based on itemCode
invoiceSchema.pre('save', async function(next) {
    try {
        // Fetch details based on itemCode (assuming there's another model for this)
        if (!this.invoiceId) {
            // Generate a unique identifier for the estimate
            this.invoiceId = new mongoose.Types.ObjectId().toString();
        }
        const itemDetails = await Inventory.findOne({ itemCode: this.itemCode });
        let totalPrice = (itemDetails.dia1 * this.rate.dia1)+(itemDetails.dia2* this.rate.dia1)
                            +(itemDetails.col1W * this.rate.col1W)+(itemDetails.col2W * this.rate.col2W)
                            +(itemDetails.gw * this.rate.gw) + (itemDetails.makingCharges || this.makingCharges)
        
        
        
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
                dia1: itemDetails.dia1,
                dia2: itemDetails.dia2,
                col1W: itemDetails.col1W,
                col2W: itemDetails.col2W,
                gw: itemDetails.gw
            };
            this.total = {
                dia1: itemDetails.dia1*this.rate.dia1,
                dia2: itemDetails.dia2 * this.rate.dia2,
                col1W: itemDetails.col1W * this.rate.col1W,
                col2W: itemDetails.col2W * this.rate.col2W,
                gw: itemDetails.gw * this.rate.gw
            };
            this.totalPrice  = totalPrice
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);