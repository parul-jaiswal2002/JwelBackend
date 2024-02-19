const mongoose = require('mongoose');
const Inventory = require('../models/inventoryModel')
const AllowedItems = require('../models/allowedValues/allowedItems')
const AllowedItemCodes = require('../models/allowedValues/allowedItemCodes')
const AllowedDia1 = require('../models/allowedValues/allowedDia1')
const AllowedDia2 = require('../models/allowedValues/allowedDia2')
const AllowedGW = require('../models/allowedValues/allowedGW')


//get all inventories api
const getAllInventory = async (req, res) => {
    const inventories = await Inventory.find({}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

//get one inventory api
const getOneInventory = async (req, res) => {
    const query = req.query.q;
    console.log('Query:', query); 
    try {
        // Fetch inventory data from your API
        const response = await Inventory.findOne({ itemCode: query });

        // Return the search results
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ error: 'Inventory not found' });
        }
    } catch (error) {
        console.error('Error fetching inventory data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//add one inventory api
const addInventory = async (req, res) => {
    const {item, itemCode, dia1, dia2, col1, col2,col1W, col2W,gold , gw, makingCharges,image} = req.body;
    try{
    const inventory = await Inventory.create({item, itemCode, dia1, dia2, col1, col2,col1W, col2W,gold , gw, makingCharges, image});
       res.status(200).json(inventory)
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

//edit one
const editInventory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Id" });
    }

    // Extract the fields from the request body
    const { item, itemCode, dia1, dia2, col1, col2, col1W, col2W,gw, ...updatedFields } = req.body;

    try {
        // Check if the updated item value exists in the allowed items list
        const allowedItem = await AllowedItems.findOne({ value: item });
        if (!allowedItem) {
            return res.status(400).json({ error: `${item} is not an allowed item` });
        }

       
        const allowedItemCode = await AllowedItemCodes.findOne({ value: itemCode });
        if (!allowedItemCode) {
            return res.status(400).json({ error: `${itemCode} is not an allowed item code` });
        }

        const allowedDia1 = await AllowedDia1.findOne({ value: dia1 });
        if (!allowedDia1) {
            return res.status(400).json({ error: `${dia1} is not an allowed item dia1` });
        }

        const allowedDia2 = await AllowedDia2.findOne({ value: dia2 });
        if (!allowedDia2) {
            return res.status(400).json({ error: `${dia2} is not an allowed item dia2` });
        }

        const allowedgw = await AllowedGW.findOne({ value: gw });
        if (!allowedgw) {
            return res.status(400).json({ error: `${gw} is not an allowed item gw` });
        }


        if (!['EM', 'RU', 'BS', 'HD', 'POK', 'TU', 'others'].includes(col1)) {
            return res.status(400).json({ error: `${col1} is not an allowed value for col1` });
        }


        if (!['EM', 'RU', 'BS', 'HD', 'POK', 'TU', 'others'].includes(col2)) {
            return res.status(400).json({ error: `${col2} is not an allowed value for col1` });
        }
  

        // Update the inventory item
        const inventory = await Inventory.findOneAndUpdate(
            { _id: id },
            { ...updatedFields },
            { new: true }
        );

        if (!inventory) {
            return res.status(404).json({ error: "No such Inventory" });
        }
        
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error updating inventory:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
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
    getOneInventory,
    addInventory,
    editInventory,
    deleteInventory,
    searchInventories
}