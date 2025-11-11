let express=require('express')
const { adminAuthRoutes } = require('./adminAuthRoutes')
const { pollRoutes } = require('./pollRoutes')
let adminRoutes=express.Router()

adminRoutes.use('/adminauth',adminAuthRoutes)
adminRoutes.use('/poll',pollRoutes)

module.exports={adminRoutes}