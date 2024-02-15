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

//delete one inventory
const deleteInventory = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await Inventory.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}


const searchInventories = async (req, res) => {
    const query = req.query.q; // Get the search query from request parameters

    try {
        // Fetch inventory data from your API
        const response = await Inventory.find({});

        // Perform the search
        const results = response.filter(inventory => {
            // Check if the query matches any of the fields in the inventory
            return (
                inventory.item.toLowerCase().includes(query.toLowerCase()) ||
                inventory.itemCode.toLowerCase().includes(query.toLowerCase()) ||
                inventory.dia1.toString().includes(query) ||
                inventory.dia2.toString().includes(query) ||
                inventory.col1.toLowerCase().includes(query.toLowerCase()) ||
                inventory.col2.toLowerCase().includes(query.toLowerCase()) ||
                inventory.gold.toLowerCase().includes(query.toLowerCase()) ||
                inventory.gw.toString().includes(query)
            );
        });

        // Return the search results
        res.json(results);
    } catch (error) {
        console.error('Error fetching inventory data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllInventory,
    addInventory,
    editInventory,
    deleteInventory,
    searchInventories
}