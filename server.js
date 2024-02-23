require("dotenv").config() 

const express = require("express")
const mongoose = require("mongoose") 
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const inventoryRouter = require('./routes/inventoryRoutes')
const allowedItemsRouter = require('./routes/allowedValues/allowedItemsRoutes');
const allowedItemCodeRouter = require('./routes/allowedValues/allowedItemCodes')
const allowedDia1 = require('./routes/allowedValues/allowedDia1')
const allowedDia2 = require('./routes/allowedValues/allowedDia2')
const allowedGW = require('./routes/allowedValues/allowedGW')
const allowedSemiPrecious = require('./routes/allowedValues/allowedSemiPrecious')
const approvalRouter = require('./routes/approval')
const estimateRouter = require('./routes/estimate')
const invoiceRouter = require('./routes/invoice')
const rawMatRouter = require('./routes/rawMaterial')
const preciousStone = require('./routes/stones/preciousStone')
const semiPrecious = require('./routes/stones/semiPreciousStone')
const superAdminRouter = require('./routes/superAdmin/superAdmin')
const comapniesRouter = require('./routes/superAdmin/companies')


//express app
const app = express()
app.use(cors())
//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path,req.method)
    next()
})


//connnect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {     
        console.log("successfully connected to db and listening to the server on port 4000 !!!")
    })
})
.catch((error) => {
    console.log(error)
})

//routing
app.use('/api/user' ,userRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/inventory/allowed-items', allowedItemsRouter)
app.use('/api/inventory/allowed-itemCodes', allowedItemCodeRouter)
app.use('/api/inventory/allowed-Dia1', allowedDia1);
app.use('/api/inventory/allowed-Dia2', allowedDia2);
app.use('/api/inventory/allowed-GW', allowedGW);
app.use('/api/inventory/allowed-semiPrecious', allowedSemiPrecious);
app.use('/api/approval', approvalRouter)
app.use('/api/estimate', estimateRouter)
app.use('/api/invoice', invoiceRouter)
app.use('/api/inventory/raw-material', rawMatRouter)
app.use('/api/inventory/precious-stone', preciousStone)
app.use('/api/inventory/semiPrecious-stone', semiPrecious)


//superAdmin
app.use('/api/superAdmin',superAdminRouter)
app.use('/api/superAdmin/companies', comapniesRouter)