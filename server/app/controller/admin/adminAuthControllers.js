const { adminAuthModel } = require("../../models/adminAuthModel")

let adminLogin = async (req, res) => {
  let { adminEmail, adminPassword } = req.body
  let obj
  console.log(adminEmail)
  let checkadmin = await adminAuthModel.findOne({ adminEmail, adminPassword })
  console.log(checkadmin)
  if (checkadmin) {
    obj = {
      status: 1,
      data: checkadmin,
      msg: 'successfully login',
    }
  }
  else {
    obj = {
      status: 0,
      msg: 'check email and password'
    }
  }
  res.send(obj)
}

let checkAdminIds = async (req, res) => {
  let { id } = req.params
  let obj
  await adminAuthModel.findOne({ _id: id })
    .then((resApi) => {
      obj = {
        status: 1,
        data: resApi
      }
    })
    .catch((error) => {
      obj = {
        status: 0,
        error
      }
    })
  res.send(obj)
}

module.exports = { adminLogin, checkAdminIds }