const Invoice = require('../models/invoice');

const createInvoice = async (req, res) => {
    const {makerName, grossWeight, invoiceId ,itemCode, content, weight, rate,total, tagNumber, totalPrice,makingCharges,  image} = req.body;
    try{
       const inventory = await Invoice.create({makerName, grossWeight, invoiceId,itemCode, content, weight, rate,total, tagNumber, totalPrice,makingCharges, image});
       res.status(200).json(inventory)
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
            return res.status(404).json({ error: "No such Estimate" });
        }

        // Extract the fields from the request body
        const { rate,total, tagNumber, makingCharges,totalPrice, ...updatedFields } = req.body;

        // Update the rate fields
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
        const updateInvoice = await Estimate.findOneAndUpdate(
            { invoiceId: invoiceId },
            { ...updatedFields,rate,total:invoice.total, tagNumber,makingCharges, totalPrice:newTotalPrice },
            { new: true }
        );

        res.status(200).json(updateInvoice);
    } catch (error) {
        console.error('Error updating estimate:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createInvoice,
    editInvoice
}