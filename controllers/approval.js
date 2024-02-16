const mongoose = require('mongoose');
const Approval = require('../models/approval');
const Inventory = require('../models/inventoryModel');

const createApproval = async (req, res) => {
    try {
        // Extract data from the request body
        const { partyName, gst, through, products } = req.body;

        // Validate that products array is not empty
        if (!products || products.length === 0) {
            return res.status(400).json({ error: 'Products array cannot be empty' });
        }

        // Fetch additional product details from the database for each product
        const productsWithDetails = await Promise.all(products.map(async (product) => {
            // Perform a lookup based on the productName to retrieve product details
            const inventoryProduct = await Inventory.findOne({ item: product.productName });

            // If product is not found, return an error
            if (!inventoryProduct) {
                return res.status(404).json({ error: `Product '${product.productName}' not found` });
            }
            // Construct the product object with additional details
            return {
                productName: inventoryProduct.item,
                priceNumber: product.priceNumber,
                itemCode : inventoryProduct.itemCode,
                dia1 : inventoryProduct.dia1,
                dia2 : inventoryProduct.dia2,
                col1 : inventoryProduct.col1,
                col2 : inventoryProduct.col2,
                gold : inventoryProduct.gold,
                gw : inventoryProduct.gw
             
            };
        }));
        console.log(productsWithDetails)
        // Create a new approval object with products containing additional details
        const newApproval = new Approval({
            partyName,
            gst,
            through,
            products: productsWithDetails // Array of products with productName, priceNumber, and additional details
        });

        // Save the new approval to the database
        await newApproval.save();

        // Return a success response
        res.status(201).json({ message: 'Approval created successfully', newApproval });
    } catch (error) {
        // If an error occurs, return an error response
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createApproval
};
