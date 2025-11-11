let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
const { adminRoutes } = require('./app/routes/admin/adminRoutes')
const { adminAuthModel } = require('./app/models/adminAuthModel')
const { webRoutes } = require('./app/routes/web/webRoutes')
require('dotenv').config()
let app = express()
app.use(express.json())
app.use(cors())

/* admin */
app.use('/admin',adminRoutes)
/* web */
app.use('/web',webRoutes)


mongoose.connect(process.env.DBNAME)
    .then(async (resApi) => {
       
        let checkadmin= await adminAuthModel.find()
        if(checkadmin.length==0)
        {
             await adminAuthModel.insertOne({
              adminEmail:process.env.ADMINEMAIL,
              adminPassword: process.env.ADMINPASSWORD
            })
        }
        app.listen(process.env.PORT, () => {
            console.log('server start')
        })
    })