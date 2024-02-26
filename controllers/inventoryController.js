const mongoose = require('mongoose');
const Inventory = require('../models/inventoryModel')
const AllowedItems = require('../models/allowedValues/allowedItems')
const AllowedItemCodes = require('../models/allowedValues/allowedItemCodes')
const AllowedDia1 = require('../models/allowedValues/allowedDia1')
const AllowedDia2 = require('../models/allowedValues/allowedDia2')
const AllowedGW = require('../models/allowedValues/allowedGW')
const Invoice = require('./invoice')




//get all inventories api
const getAllInventory = async (req, res) => {
    const user_id = req.user._id; //ab ye sirf usi user k workout serch krega

    try {
        // Query all inventories
        const allInventories = await Inventory.find({ user_id });

        // Loop through each inventory
        for (const inventory of allInventories) {
            // Query invoices for this inventory
            const invoicesForInventory = await Invoice.find({ inventory: inventory._id });

            // Calculate total quantity sold for this inventory
            const totalQuantitySold = invoicesForInventory.reduce((total, invoice) => total + invoice.quantity, 0);

            // Update the inventory quantity
            inventory.qnty -= totalQuantitySold;

            // Save the updated inventory
            await inventory.save();
        }

        // Query invoices to find inventories with no associated invoices
        const invoices = await Invoice.find({ user_id }).distinct('inventory');
        const inventoriesWithInvoices = invoices.map(invoice => invoice.toString());

        // Filter inventories without associated invoices
        const availableInventories = allInventories.filter(inventory => !inventoriesWithInvoices.includes(inventory._id.toString()));

        // Send the response with all available inventories
        res.status(200).json({ inventories: availableInventories });

    } catch (error) {
        console.error('Error updating inventory quantities:', error);
        res.status(500).json({ error: 'Failed to update inventory quantities' });
    }
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
    const {item, itemCode, dia1, dia2, col1, col2,col1W, col2W,gold , gw, makingCharges,image, qnty} = req.body;
    try{

        const user_id = req.user._id //requireauth se
        console.log(user_id)
        // yha hm workout nam ka document bna rhe h
       const inventory = await Inventory.create({item, itemCode, dia1, dia2, col1, col2,col1W, col2W,gold , gw, makingCharges,image,qnty, user_id}) //to make it synchronus
       res.status(200).json(inventory) //us document ko hm resposne krenge taki user ko lge uska data create ho gya h
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
    const { item, itemCode, dia1, dia2, col1, col2, col1W, col2W,gw,qnty, ...updatedFields } = req.body;

    try {
        // Check if the updated item value exists in the allowed items list
        const allowedItem = await AllowedItems.findOne({ value: item });
        
        if (!allowedItem) {
            return res.status(400).json({ error: `${item} is not an allowed item` });
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
            { ...updatedFields, item, itemCode, dia1, dia2, col1, col2, col1W, col2W,gw,qnty },
            { new: true }
        );

        console.log(inventory)
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