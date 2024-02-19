const Estimate = require('../models/estimate');

const createEstimate = async (req, res) => {
    const {estimateId ,itemCode, content, weight, rate,total, tagNumber, totalPrice} = req.body;
    try{
       const inventory = await Estimate.create({estimateId,itemCode, content, weight, rate,total, tagNumber, totalPrice});
       console.log(inventory)
       res.status(200).json(inventory)
    console.log("in create estimate")
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}


// //edit estimate
// const editEstimate = async (req, res) => {

// }

module.exports = {
    createEstimate
}