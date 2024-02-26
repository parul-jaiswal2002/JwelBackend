const Invoice = require('../models/invoice');
const Inventory = require('../models/inventoryModel')

const getAllInvoices = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await Invoice.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

const getSingleInvoice = async (req, res) => {
    const { invoiceId } = req.params;
    try{
        const invoice = await Invoice.findOne({ invoiceId });
        if(!invoice){
            return res.status(404).json({ error: "No such Invoice" });
        }
        res.status(200).json(invoice)
    }
    catch(error){
        res.status(400).json({error : "Some server error!"})
     }
}

const createInvoice = async (req, res) => {
    const {makerName, grossWeight, invoiceId ,itemCode, content, weight, rate,total, tagNumber, totalPrice,makingCharges,  image,totalAfterTag,qnty} = req.body;
    try{
        const user_id = req.user._id
        const inventoryExists = await Inventory.findOne({ itemCode, user_id });
        if (!inventoryExists) {
            return res.status(400).json({ error: "Inventory with the given itemCode does not exist for the user" });
        }
       
        const invoice = await Invoice.create({makerName, grossWeight, invoiceId,itemCode, content, weight, rate,total, tagNumber, totalPrice,makingCharges, image,totalAfterTag, qnty, user_id});
        inventoryExists.qnty -= qnty;
        await inventoryExists.save();
       res.status(200).json(invoice)
    }
    catch(error){
       res.status(400).json({error : error.message})
    }

}


//edit invoice
const editInvoice = async (req, res) => {
    const { invoiceId } = req.params;

    try {
        // Find the estimate by estimateId
        const invoice = await Invoice.findOne({ invoiceId });
        if (!invoice) {
            return res.status(404).json({ error: "No such Invoice" });
        }

        // Extract the fields from the request body
        const { makerName, grossWeight, rate,total, tagNumber, makingCharges,totalPrice, ...updatedFields } = req.body;

        // Update the rate fields
        invoice.makerName = makerName,
        invoice.grossWeight = grossWeight,
        invoice.rate = rate;
        invoice.tagNumber = tagNumber;
        invoice.makingCharges = makingCharges
        invoice.total = {
            dia1 : invoice.weight.dia1 * rate.dia1,
            dia2 : invoice.weight.dia2* rate.dia2,
            col1W : invoice.weight.col1W * rate.col1W,
            col2W : invoice.weight.col2W * rate.col2W,
            gw : invoice.weight.gw * rate.gw
        }
       
        let newTotalPrice = (invoice.total.dia1) + (invoice.total.dia2) + (invoice.total.col1W) + (invoice.total.col2W) + (invoice.total.gw) + (invoice.makingCharges || makingCharges);
      

        newTotalPrice += newTotalPrice*(tagNumber)/100
        // Update the total price
        // estimate.totalPrice = newTotalPrice;

        // Save the updated estimate
        // const updatedEstimate = await estimate.save();
        const updateInvoice = await Invoice.findOneAndUpdate(
            { invoiceId: invoiceId },
            { ...updatedFields,makerName,grossWeight, rate,total:invoice.total, tagNumber,makingCharges, totalPrice:newTotalPrice },
            { new: true }
        );

        res.status(200).json(updateInvoice);
    } catch (error) {
        console.error('Error updating estimate:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//delete a invoice 
const deleteInvoice = async (req, res) => {
    const {invoiceId} = req.params
    const invoice = await Invoice.findOne({ invoiceId });
    const deleted = await Invoice.deleteOne({invoiceId})
        if(!invoice){
            return res.status(404).json({error : "No such Invoice"})
        }
        res.status(200).json("deleted Successfully")
   
}
module.exports = {
    getAllInvoices,
    getSingleInvoice,
    createInvoice,
    editInvoice,
    deleteInvoice

}