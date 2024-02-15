const express = require('express');
const mongoose = require('mongoose');
const AllowedDia2 = require('../../models/allowedValues/allowedDia2');


const getAllItems = async (req, res) => {
    const allItems = await AllowedDia2.find({}).sort({createdAt : -1})
    res.status(200).json(allItems)
}

const allowedItems = async (req, res) => {
    const { value } = req.body;
    try {
        const existingValue = await AllowedDia2.findOne({ value });
        if (existingValue) {
            return res.status(400).json({ error: 'Value already exists' });
        }
        const newValue = new AllowedDia2({ value });
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