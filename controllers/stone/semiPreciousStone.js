const mongoose = require('mongoose');
const semiPreciousStone = require('../../models/stones/semiPreciousStone')



//get all Precious Stones api
const getAllSemiPrecious = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await semiPreciousStone.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

//get one Precious Stone api
const getOneSemiPrecious = async (req, res) => {
    const {id} = req.params
    try {
        // Fetch inventory data from your API
        const response = await semiPreciousStone.findOne({ _id : id });

        // Return the search results
        if (response) {
            res.json(response);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching item data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//add one Precious Stone api
const addSemiPrecious= async (req, res) => {
    const {item,weight, shape, size} = req.body;
    try{

       const user_id = req.user._id //requireauth se
    
       const preciousStone = await semiPreciousStone.create({item, weight,shape, size, user_id}) //to make it synchronus
       res.status(200).json(preciousStone) //us document ko hm resposne krenge taki user ko lge uska data create ho gya h
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

//edit one
const editSemiPrecious = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Id" });
    }

    // Extract the fields from the request body
    const { item, weight,shape, size,  ...updatedFields } = req.body;

    try {
       

        // Update the inventory item
        const inventory = await semiPreciousStone.findOneAndUpdate(
            { _id: id },
            { ...updatedFields, item, weight,shape, size},
            { new: true }
        );

        console.log(inventory)
        if (!inventory) {
            return res.status(404).json({ error: "No such Item" });
        }
        
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error updating Item:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//delete one inventory
const deleteSemiPrecious = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await semiPreciousStone.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}


const searchSemiPrecious = async (req, res) => {
    const query = req.query.q; // Get the search query from request parameters

    try {
        // Fetch inventory data from your API
        const response = await semiPreciousStone.find({});

        // Perform the search
        const results = response.filter(inventory => {
            // Check if the query matches any of the fields in the inventory
            return (
                inventory.item.toLowerCase().includes(query.toLowerCase()) ||
                inventory.weight.toString().includes(query) ||
                inventory.shape.toLowerCase().includes(query.toLowerCase) ||
                inventory.size.toString().includes(query.toString()) 

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
    getAllSemiPrecious,
    getOneSemiPrecious,
    addSemiPrecious,
    editSemiPrecious,
    deleteSemiPrecious,
    searchSemiPrecious
}