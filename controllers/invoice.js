const Invoice = require('../models/invoice');

const createInvoice = async (req, res) => {
    const {estimateId ,itemCode, content, weight, rate,total, tagNumber, totalPrice, image} = req.body;
    try{
       const inventory = await Invoice.create({estimateId,itemCode, content, weight, rate,total, tagNumber, totalPrice, image});
       console.log(inventory)
       res.status(200).json(inventory)
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

module.exports = {
    createInvoice
}