const express = require('express');
const mongoose = require('mongoose');
const AllowedDia1 = require('../../models/allowedValues/allowedDia1');


const getAllItems = async (req, res) => {
    const allItems = await AllowedDia1.find({}).sort({createdAt : -1})
    res.status(200).json(allItems)
}

const allowedItems = async (req, res) => {
    const { value } = req.body;
    try {
        const existingValue = await AllowedDia1.findOne({ value });
        if (existingValue) {
            return res.status(400).json({ error: 'Value already exists' });
        }
        const newValue = new AllowedDia1({ value });
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