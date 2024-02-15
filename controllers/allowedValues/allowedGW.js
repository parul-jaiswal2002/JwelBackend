const express = require('express');
const mongoose = require('mongoose');
const AllowedGW = require('../../models/allowedValues/allowedGW');


const getAllItems = async (req, res) => {
    const allItems = await AllowedGW.find({}).sort({createdAt : -1})
    res.status(200).json(allItems)
}

const allowedItems = async (req, res) => {
    const { value } = req.body;
    try {
        const existingValue = await AllowedGW.findOne({ value });
        if (existingValue) {
            return res.status(400).json({ error: 'Value already exists' });
        }
        const newValue = new AllowedGW({ value });
        await newValue.save();
        res.status(201).json(newValue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    allowedItems,
    getAllItems
}