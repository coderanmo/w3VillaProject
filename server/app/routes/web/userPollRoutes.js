let express=require('express')
const { checkToken } = require('../../middleware/checkToken')
const { addUserPoll, viewUserPoll, viewAllPoll } = require('../../controller/web/userPoll')

let userPollRoutes=express.Router()

userPollRoutes.post('/create',checkToken,addUserPoll)
userPollRoutes.post('/check-response',checkToken,viewUserPoll)
userPollRoutes.get('/all-response',viewAllPoll)

module.exports={userPollRoutes}