const Estimate = require('../models/estimate');
const Inventory = require('../models/inventoryModel')



const getAllEstiamte = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await Estimate.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

const createEstimate = async (req, res) => {
    const {estimateId ,itemCode, content, weight, rate,total, makingCharges,totalPrice, tagNumber, image, totalAfterTag, qnty} = req.body;
    try{

        const user_id = req.user._id
        // Check if the itemCode exists for the particular user's inventories
        const inventoryExists = await Inventory.findOne({ itemCode, user_id });
        if (!inventoryExists) {
            return res.status(400).json({ error: "Inventory with the given itemCode does not exist for the user" });
        }
       const inventory = await Estimate.create({estimateId ,itemCode, content, weight, rate,total, makingCharges,totalPrice, tagNumber, image, totalAfterTag, qnty, user_id});
 
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
        // estimate.totalPrice = newTotalPrice;

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

//deleteEstimate  api
const deleteEstimate = async (req, res) => {
    const {estimateId} = req.params
    const invoice = await Estimate.findOne({ estimateId });
    const deleted = await Estimate.deleteOne({estimateId})
        if(!invoice){
            return res.status(404).json({error : "No such Estimate"})
        }
        res.status(200).json("deleted Successfully")
}



const searchEstimate = async (req, res) => {
    const {query}  = req.query // Get the search query from request parameters

    try {
        const user_id = req.user._id
        // Fetch inventory data from your API
        const response = await Estimate.find({user_id});
         console.log(response)
        // Perform the search
        const results = response.filter(estimate => {
            // Check if the query matches any of the fields in the inventory
            return (
                estimate.itemCode.toLowerCase().includes(query.toLowerCase()) ||
                estimate.tagNumber.toString().includes(query) 
            );
        });

        // Return the search results
        res.json(results);
    } catch (error) {
        console.error('Error fetching estimate data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllEstiamte,
    createEstimate,
    editEstimate,
    deleteEstimate,
    searchEstimate
}