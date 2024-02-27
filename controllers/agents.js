const Agent = require('../models/agents')

const getAllAgents = async (req, res) => {
    const user_id = req.user._id 
    const agents = await Agent.find({user_id}).sort({createdAt : -1})
   res.status(200).json(agents)
}

const createAgent = async (req, res) => {
    const {name,companyName, gst, email,contact } = req.body
    try{
        const user_id = req.user._id;
        const agent = await Agent.create({name,companyName, gst, email,contact, user_id})
        res.status(200).json(agent)
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

const editAgent = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No Such Id"})
    }
    const agent = await Agent.findOneAndUpdate({_id : id}, {
        ...req.body
    })
    if(!agent){
        return res.status(404).json({error : "No such agent"})
    }
    res.status(200).json(agent)
}

const deleteAgent = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error : "No Such Id"
        })
    }
    const agent  = await Agent.findByIdAndDelete({_id : id})
    if(!agent){
        return res.status(404).json({
            error : "No such agent"
        })
    }
    res.status(200).json(agent)
}

const searchAgent = async (req, res) => {
    const { query } = req.query;// Get the search query from request parameters

    try {
        const user_id = req.user._id;
        // Fetch inventory data from your API
        const response = await Agent.find({user_id});
        // Perform the search
        const results = response.filter(agent=> {
            // Check if the query matches any of the fields in the inventory
            return (
                agent.name.toLowerCase().includes(query.toLowerCase()) ||
                agent.companyName.toLowerCase().includes(query.toLowerCase()) ||
                agent.gst.toString().includes(query) ||
                agent.contact.toString().includes(query) ||
                agent.email.toLowerCase().includes(query.toLowerCase())
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
    getAllAgents,
    createAgent,
    editAgent,
    deleteAgent,
    searchAgent
}