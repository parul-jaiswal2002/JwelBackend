const express = require('express');
const {getAllClients, createClient, editClient, deleteClient, searchClient} = require('../controllers/clients')

//middleware
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// get all agents
router.get('/', getAllClients)

//create a new agent
router.post('/', createClient)

router.put('/:id', editClient)

router.delete('/:id', deleteClient)

router.get('/search', searchClient)

module.exports = router;