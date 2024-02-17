require("dotenv").config() 

const express = require("express")
const mongoose = require("mongoose") 
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const inventoryRouter = require('./routes/inventoryRoutes')
const allowedItemsRouter = require('./routes/allowedValues/allowedItemsRoutes');
const allowedDia1 = require('./routes/allowedValues/allowedDia1')
const allowedDia2 = require('./routes/allowedValues/allowedDia2')
const allowedGW = require('./routes/allowedValues/allowedGW')
const approvalRouter = require('./routes/approval')
const estimateRouter = require('./routes/estimate')

//express app
const app = express()
//middleware
app.use(express.json())
app.use(cors())

//connnect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {     
        console.log("successfully connected to db and listening to the server on port 3000 !!!")
    })
})
.catch((error) => {
    console.log(error)
})

//routing
app.use('/api/user' ,userRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/inventory/allowed-items', allowedItemsRouter)
app.use('/api/inventory/allowed-Dia1', allowedDia1);
app.use('/api/inventory/allowed-Dia2', allowedDia2);
app.use('/api/inventory/allowed-GW', allowedGW);
app.use('/api/approval', approvalRouter)
app.use('/api/estimate', estimateRouter)
