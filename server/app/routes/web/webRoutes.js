let express=require('express')
const { userRoutes } = require('./userRoutes')
const { userPollRoutes } = require('./userPollRoutes')

let webRoutes=express.Router()


webRoutes.use('/userauth',userRoutes)
webRoutes.use('/userpoll',userPollRoutes)


module.exports={webRoutes}