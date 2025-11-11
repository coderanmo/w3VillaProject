let express=require('express')
const { adminLogin, checkAdminIds } = require('../../controller/admin/adminAuthControllers')
let adminAuthRoutes=express.Router()

adminAuthRoutes.post('/login',adminLogin)
adminAuthRoutes.get('/check-id/:id',checkAdminIds)
module.exports={adminAuthRoutes}