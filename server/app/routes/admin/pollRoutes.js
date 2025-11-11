let express=require('express')
const { addPoll, viewPoll, updatePoll, deletePoll, viewSinglePoll } = require('../../controller/admin/pollController')

let pollRoutes=express.Router()

pollRoutes.post('/create',addPoll)
pollRoutes.get('/view',viewPoll)
pollRoutes.put('/update/:id',updatePoll)
pollRoutes.delete('/delete/:id',deletePoll)
pollRoutes.get('/single-poll/:id',viewSinglePoll)

module.exports={pollRoutes}