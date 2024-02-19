const Estimate = require('../models/estimate');
const Inventory = require('../models/inventoryModel')


const createEstimate = async (req, res) => {
    const {estimateId ,itemCode, content, weight, rate,total, tagNumber,makingCharges, totalPrice} = req.body;
    try{
       const inventory = await Estimate.create({estimateId,itemCode, content, weight, rate,total, tagNumber,makingCharges, totalPrice});
 
       res.status(200).json(inventory)
 
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}


//edit estimate
const editEstimate = async (req, res) => {
    const { estimateId } = req.params;
    console.log(estimateId)

    try {
        // Find the estimate by estimateId
        const estimate = await Estimate.findOne({ estimateId });
        if (!estimate) {
            return res.status(404).json({ error: "No such Estimate" });
        }

        // Extract the fields from the request body
        const { rate,total, tagNumber, makingCharges,totalPrice, ...updatedFields } = req.body;

        // Update the rate fields
        estimate.rate = rate;
        estimate.tagNumber = tagNumber;
        estimate.makingCharges = makingCharges
        estimate.total = {
            dia1 : estimate.weight.dia1 * rate.dia1,
            dia2 : estimate.weight.dia2* rate.dia2,
            col1W : estimate.weight.col1W * rate.col1W,
            col2W : estimate.weight.col2W * rate.col2W,
            gw : estimate.weight.gw * rate.gw
        }
       
        let newTotalPrice = (estimate.total.dia1) + (estimate.total.dia2) + (estimate.total.col1W) + (estimate.total.col2W) + (estimate.total.gw) + (estimate.makingCharges || makingCharges);
      

        newTotalPrice += newTotalPrice*(tagNumber)/100
        // Update the total price
        estimate.totalPrice = newTotalPrice;

        // Save the updated estimate
        // const updatedEstimate = await estimate.save();
        const updatedEstimate = await Estimate.findOneAndUpdate(
            { estimateId: estimateId },
            { ...updatedFields,rate,total:estimate.total, tagNumber,makingCharges, totalPrice:newTotalPrice },
            { new: true }
        );

        res.status(200).json(updatedEstimate);
    } catch (error) {
        console.error('Error updating estimate:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createEstimate,
    editEstimate
}