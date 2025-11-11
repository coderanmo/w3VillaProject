const { pollModel } = require("../../models/pollModel");

//  Add Poll (Create)
let addPoll = async (req, res) => {
    let { pollQuestion, pollAnswers, pollOrder, closingDateTime } = req.body;
    let obj;

    if (!pollQuestion || !pollAnswers || pollAnswers.length < 2 || !closingDateTime) {
        obj = {
            status: 0,
            msg: "Please provide question, at least 2 answers, and closing date/time"
        };
        return res.send(obj);
    }

    await pollModel
        .insertMany([{ pollQuestion, pollAnswers, pollOrder, closingDateTime }])
        .then((resApi) => {
            obj = {
                status: 1,
                msg: "Poll created successfully",
                data: resApi
            };
        })
        .catch((error) => {
            let errorMsg = "Error while creating poll";
            if (error.code === 11000) errorMsg = "Please use a unique order number";
            if (error.errors) {
                if (error.errors.pollQuestion)
                    errorMsg = error.errors.pollQuestion.message;
                if (error.errors.pollAnswers)
                    errorMsg = error.errors.pollAnswers.message;
                if (error.errors.pollOrder)
                    errorMsg = error.errors.pollOrder.message;
                if (error.errors.closingDateTime)
                    errorMsg = error.errors.closingDateTime.message;
            }
            obj = { status: 0, msg: errorMsg };
        });

    res.send(obj);
};

//  View All Polls

let viewPoll = async (req, res) => {
    let obj;
    await pollModel.find()
        .then((resApi) => {
            let now = new Date();

            let polls = resApi.map((poll) => {
                let isExpired = new Date(poll.closingDateTime) < now;
                return {
                    ...poll._doc,
                    isExpired,
                    pollStatus: !isExpired
                }
            })

            obj = {
                status: 1,
                msg: "Polls retrieved successfully",
                data: polls
            }
        })
        .catch((error) => {
            obj = { status: 0, msg: "Failed to retrieve polls" };
        })

    res.send(obj);
};

//  Update Poll

let updatePoll = async (req, res) => {
    let { id } = req.params;
    let { pollQuestion, pollAnswers, pollOrder, closingDateTime } = req.body;
    let obj;

    if (!pollQuestion || !pollAnswers || pollAnswers.length < 2 || !closingDateTime) {
        obj = {
            status: 0,
            msg: "Please provide question, at least 2 answers, and closing date/time"
        };
        return res.send(obj);
    }

    let updateObj = { pollQuestion, pollAnswers, pollOrder, closingDateTime };

    await pollModel
        .updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            if (resApi.modifiedCount > 0) {
                obj = {
                    status: 1,
                    msg: "Poll updated successfully"
                }
            }
            else {
                obj = {
                    status: 0,
                    msg: "No changes made or poll not found"
                }
            }
        })
        .catch((error) => {
            let errorMsg = "Error while updating poll";
            if (error.code === 11000) errorMsg = "Please use a unique order number";
            obj = { status: 0, msg: errorMsg };
        });

    res.send(obj);
}

//  Delete Poll

let deletePoll = async (req, res) => {
    let { id } = req.params
    let obj
    console.log(id)

    await pollModel.deleteOne({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete poll'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: "Error while deleting poll"
            }
        })

    res.send(obj);
};

let viewSinglePoll = async (req, res) => {
    let obj;
    let {id}=req.params
    console.log(id)
    await pollModel.findOne({_id:id})
        .then((resApi) => {
            obj={
                status:1,
                data:resApi
            }
        })
        .catch((error) => {
            obj = { status: 0, msg: "Failed to retrieve polls" };
        })

    res.send(obj);
};



module.exports = { addPoll, viewPoll, updatePoll, deletePoll,viewSinglePoll }
