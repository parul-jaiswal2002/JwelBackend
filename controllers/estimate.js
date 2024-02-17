const Estimate = require('../models/estimate');

const createEstimate = async (req, res) => {
    const {estimateId ,itemCode, content, weight, rate,total, tagNumber, totalPrice} = req.body;
    try{
       const inventory = await Estimate.create({estimateId,itemCode, content, weight, rate,total, tagNumber, totalPrice});
       console.log(inventory)
       res.status(200).json(inventory)
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

module.exports = {
    createEstimate
}