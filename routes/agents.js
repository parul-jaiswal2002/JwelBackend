const express = require('express');
const {getAllAgents, createAgent, editAgent, deleteAgent, searchAgent} = require('../controllers/agents')

//middleware
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// get all agents
router.get('/', getAllAgents)

//create a new agent
router.post('/', createAgent)

//edit a agent
router.put('/:id', editAgent)

//delete a agent
router.delete('/:id', deleteAgent)

//search agents 
router.get("/search", searchAgent)

module.exports = router;

