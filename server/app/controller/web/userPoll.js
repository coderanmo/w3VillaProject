const { pollModel } = require("../../models/pollModel");
const { userPollModel } = require("../../models/userPollModels");

let addUserPoll = (req, res) => {
  const { id, answer, pollId } = req.body;

  if (!answer) {
    return res.json({ status: 0, msg: "Please select one option" });
  }

  userPollModel.findOne({ userId: id, pollId: pollId })
    .then(existingPoll => {
      if (existingPoll) {
        return res.json({ status: 0, msg: "You have already submitted your response" });
      }

      return userPollModel.create({ userId: id, pollAnswer: answer, pollId: pollId });
    })
    .then(newPoll => {
      if (newPoll) {
        return res.json({ status: 1, msg: "Your opinion has been submitted", data: newPoll });
      }
    })
    .catch(error => {
      console.error(error);
      return res.json({ status: 0, msg: "Failed to submit poll", error: error.message });
    });
}

let viewUserPoll = async (req, res) => {
  let obj
  let { id } = req.body
  console.log(id)
  await userPollModel.find({ userId: id })
    .then((resApi) => {
      obj = {
        status: 1,
        data: resApi
      }
    })
    .catch((error) => {
      obj = {
        status: 0,
        msg: 'no data'
      }
    })
  res.send(obj)
}


let viewAllPoll = async (req, res) => {
  let obj
  await userPollModel.find()
    .then((resApi) => {
      obj = {
        status: 1,
        data: resApi
      }
    })
    .catch((error) => {
      obj = {
        status: 0,
        msg: 'no data'
      }
    })
  res.send(obj)
}




module.exports = { addUserPoll, viewUserPoll, viewAllPoll,  };
