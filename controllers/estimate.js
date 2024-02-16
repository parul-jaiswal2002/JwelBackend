const Estimate = require('../models/estimate');

const createEstimate = async (req, res) => {
    const {itemCode, content, weight, rate,total, tagNumber} = req.body;
    try{
       const inventory = await Estimate.create({itemCode, content, weight, rate,total, tagNumber});
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