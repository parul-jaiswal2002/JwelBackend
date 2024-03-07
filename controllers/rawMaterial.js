const mongoose = require('mongoose');
const RawMaterial = require('../models/rawMaterial')



//get all raw material api
const getAllRawMaterial = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await RawMaterial.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

//get one inventory api
const getOneRawMaterial = async (req, res) => {
    const {id} = req.params
    try {
        // Fetch inventory data from your API
        const response = await RawMaterial.findOne({ _id : id });

        // Return the search results
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ error: 'Raw Material not found' });
        }
    } catch (error) {
        console.error('Error fetching Raw Material data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//add one raw material api
const addRawMaterial = async (req, res) => {
    const {item,weight, purity} = req.body;
    try{

       const user_id = req.user._id //requireauth se
    
       const rawMaterial = await RawMaterial.create({item, weight, purity, user_id}) //to make it synchronus
       res.status(200).json(rawMaterial) 
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

//edit one
const editRawMaterial = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Id" });
    }

    // Extract the fields from the request body
    const { item, weight,purity,  ...updatedFields } = req.body;

    try {
       

        // Update the inventory item
        const inventory = await RawMaterial.findOneAndUpdate(
            { _id: id },
            { ...updatedFields, item, weight, purity},
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
const deleteRawMaterial = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await RawMaterial.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}


const searchRawMaterial = async (req, res) => {
    const query = req.query.q; // Get the search query from request parameters

    try {
        // Fetch inventory data from your API
        const response = await RawMaterial.find({});

        // Perform the search
        const results = response.filter(inventory => {
            // Check if the query matches any of the fields in the inventory
            return (
                inventory.item.toLowerCase().includes(query.toLowerCase()) ||
                inventory.weight.toString().includes(query) ||
                inventory.purity.toString().includes(query)
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
    getAllRawMaterial,
    getOneRawMaterial,
    addRawMaterial,
    editRawMaterial,
    deleteRawMaterial,
    searchRawMaterial
}