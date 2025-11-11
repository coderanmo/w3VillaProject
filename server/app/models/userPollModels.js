let mongoose = require('mongoose');

let userPollSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        pollAnswer:{
            type:String,
            required:[true,'please select one check box']
        },
        pollId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'poll'
        }
    }
)

let userPollModel = mongoose.model('userPoll', userPollSchema);
module.exports = { userPollModel };
