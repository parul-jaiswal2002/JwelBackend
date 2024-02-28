// const CamAnd3d = require('../../models/production/production') 
// const Casting = require('../../models/production/production')
// const StoneSetting = require('../../models/production/production')
const {CamAnd3d, Casting,StoneSetting} = require('../../models/production/production')
const mongoose = require('mongoose')


const getAllcam3d = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await CamAnd3d.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

const create3d = async (req, res) => {
    const {image, startDate, endDate, status} = req.body;
    try{

       const user_id = req.user._id //requireauth se
    
       const cams = await CamAnd3d.create({image, startDate, endDate, status, user_id}) //to make it synchronus
       res.status(200).json(cams) 
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

const delete3d = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await CamAnd3d.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}

const getAllcasting = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await Casting.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

const createCasting = async (req, res) => {
    const {image, material, startDate, endDate, status} = req.body;
    try{

       const user_id = req.user._id //requireauth se
    
       const casting = await Casting.create({image,material, startDate, endDate, status, user_id}) //to make it synchronus
       res.status(200).json(casting) 
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

const deleteCasting = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await Casting.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}


const getAllStoneSetting = async (req, res) => {
    const user_id = req.user._id //ab ye sirf usi user k workout serch krega
     const inventories = await StoneSetting.find({user_id}).sort({createdAt : -1})
    res.status(200).json(inventories)
}

const createStoneSetting = async (req, res) => {
    const {image,material, stoneOrDiamond, qnty, startDate, endDate, status} = req.body;
    try{

       const user_id = req.user._id //requireauth se
    
       const cams = await StoneSetting.create({image,material, stoneOrDiamond, qnty, startDate, endDate, status, user_id}) //to make it synchronus
       res.status(200).json(cams) 
    }
    catch(error){
       res.status(400).json({error : error.message})
    }
}

const deleteStoneSetting = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const inventory = await StoneSetting.findByIdAndDelete({_id : id})
    if(!inventory){
        return res.status(404).json({error : "No such Inventory"})
    }
    res.status(200).json(inventory)
}

module.exports = {
    getAllcam3d,
    create3d,
    delete3d,
    getAllcasting,
    createCasting,
    deleteCasting,
    getAllStoneSetting,
    createStoneSetting,
    deleteStoneSetting
}

