const mongoose = require('mongoose');
const Inventory = require('../models/inventoryModel')

//get all inventories api
const getAllInventory = async (req, res) => {
    const inventories = await Inventory.find({}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

//add one inventory api
const addInventory = async (req, res) => {
    const {item, itemCode, dia1, dia2, col1, col2,gold , gw} = req.body;
    try{
       const inventory = await Inventory.create({item, itemCode, dia1, dia2, col1, col2,gold , gw});
       res.status(200).json(inventory)
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

//edit one
const editInventory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await Inventory.findOneAndUpdate({_id : id}, {
        ...req.body
    })
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}

module.exports = {
    getAllInventory,
    addInventory,
    editInventory
}