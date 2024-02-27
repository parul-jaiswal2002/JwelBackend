const Client = require('../models/clients')


const getAllClients = async (req, res) => {
    const user_id = req.user._id 
    const agents = await Client.find({user_id}).sort({createdAt : -1})
   res.status(200).json(agents)
}

const createClient = async (req, res) => {
    const {firstName, lastName,companyName, gst, email,contact} = req.body
    try{
        const user_id = req.user._id;
        const agent = await Client.create({firstName, lastName,companyName, gst, email,contact, user_id})
        res.status(200).json(agent)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

const editClient = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const client = await Client.findOneAndUpdate({_id : id}, {
        ...req.body
    })
    if(!client){
        return res.status(404).json({error : "No such client"})
    }
    res.status(200).json(client)
}

const deleteClient = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error : "No Such Id"
        })
    }
    const client  = await Client.findByIdAndDelete({_id : id})
    if(!client){
        return res.status(404).json({
            error : "No such client"
        })
    }
    res.status(200).json(client)
}

const searchClient = async (req, res) => {
    const { query } = req.query;// Get the search query from request parameters

    try {
        const user_id = req.user._id;
        // Fetch inventory data from your API
        const response = await Client.find({user_id});
        // Perform the search
        const results = response.filter(client=> {
            // Check if the query matches any of the fields in the inventory
            return (
                client.firstName.toLowerCase().includes(query.toLowerCase()) ||
                client.lastName.toLowerCase().includes(query.toLowerCase()) ||
                client.companyName.toLowerCase().includes(query.toLowerCase()) ||
                client.gst.toString().includes(query) ||
                client.contact.toString().includes(query) ||
                client.email.toLowerCase().includes(query.toLowerCase())
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
    getAllClients,
    createClient,
    editClient,
    deleteClient,
    searchClient
}