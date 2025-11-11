const { transporter } = require("../../config/mailConfig")
const { userModel } = require("../../models/userAuthModel")
let validate = require('validator')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
let userOtp = new Map()

let saltRounds = 10

let sendOtp = async (req, res) => {
    let { userEmail, userPassword, userConfirm } = req.body
    console.log(userEmail,userConfirm)
    let obj
    let checkEmail = await userModel.findOne({ userEmail: userEmail })

    if (checkEmail) {
        obj = {
            status: 0,
            msg: 'this email already registerd'
        }
    }
    else {
        if (!validate.isEmail(userEmail)) {
            obj = {
                status: 0,
                msg: "Invalid email format"
            }
            res.send(obj)
        }
        console.log(userPassword)
        if (!validate.isStrongPassword(userPassword, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, })) {
            obj = {
                status: 0,
                msg: "Password must be strong (min 8 chars, include upper, lower, number, and symbol"
            }
            res.send(obj)
        }
        if (userPassword == userConfirm) {
            let randomOtp = Number((Math.random() * 99999).toString().split('.')[0].slice(0, 4))
            userOtp.set('myOTP', randomOtp)

            let info = await transporter.sendMail({
                from: '"MONSTA" <amolyadav95200@gmail.com>',
                to: `userEmail, ${userEmail}`,
                subject: "MONSTA OTP",
                text: "OTP",
                html: `<b> OTP : ${randomOtp}</b>`,
            });
            obj = {
                status: 1,
                msg: 'send otp'
            }

        }
        else {
            obj = {
                status: 0,
                msg: 'password and confirm Password are not same'
            }
        }
    }
    res.send(obj)
}

let createUserAccount = async (req, res) => {
    let { userName, userEmail, userPassword, otp } = req.body
    let obj
    let myOtp = userOtp.get('myOTP')
    if (myOtp == otp) {
        let hash = bcrypt.hashSync(userPassword, saltRounds)
        let insertObj = { userName, userEmail, userPassword: hash, otp }
        await userModel.insertOne(insertObj)
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'succesfully register'
                }
            })
    }
    else {
        obj = {
            status: 0,
            msg: 'please fill correct otp'
        }
    }
    res.send(obj)
}

let loginAccount = async (req, res) => {
    let { userEmail, userPassword } = req.body
    let obj
    let checkEmail = await userModel.findOne({ userEmail })
    if (checkEmail) {
        let getPassDb = checkEmail.userPassword
        let checkPass = bcrypt.compareSync(userPassword, getPassDb)

        // check token 
        let token = jwt.sign({ id: checkEmail._id }, process.env.TOKEN);
        if (checkPass) {

            obj = {
                status: 1,
                msg: 'successfull login',
                data: checkEmail,
                token
            }
        }
        else {
            obj = {
                status: 0,
                msg: 'fill correct password'
            }
        }

    }
    else {
        obj = {
            status: 0,
            msg: 'please fill valid email'
        }
    }
    res.send(obj)
}

let getsinglProfileData = async (req, res) => {
    let { id } = req.params

    let obj
    await userModel.findOne({ _id: id })
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



let changePassword = async (req, res) => {
    let { id, userPassword, newPassword, rePassword } = req.body
    let obj
    let findData = await userModel.findOne({ _id: id })
    if (findData) {
        if (newPassword == rePassword) {
            let hash = bcrypt.hashSync(newPassword, saltRounds);
            await userModel.updateOne({ _id: id }, {
                $set: {
                    userPassword: hash
                }
            })
                .then((resApi) => {
                    obj = {
                        status: 1,
                        msg: 'update password'
                    }
                })
                .catch((error) => {
                    obj = {
                        status: 0,
                        msg: 'password are not strong'
                    }
                })
        }
        else {
            oj = {
                status: 0,
                msg: 'new Password  & confirm Password are not same'
            }
        }
    }
    else {
        obj = {
            status: 0,
            msg: 'please fill correct old password '
        }
    }
    res.send(obj)
}

let updateUserProfile = async (req, res) => {

    let { id, userName, userGender, userPhone, userAddress } = req.body
    let userData = await userModel.findOne({ _id: id })
    console.log(userData)
    if (userData) {
        await userModel.updateOne({ _id: id }, {
            $set: {
                userName,
                userGender,
                userPhone,
                userAddress
            }
        })
            .then((resApi) => {
                obj = {
                    status: 1,
                    msg: 'update profile',
                }
            })
            .catch((error) => {
                let errorMsg
                if (error.errors) {
                    if (error.errors.userName) {
                        errorMsg: error.errors.userName.message
                    }
                }
                obj = {
                    status: 0,
                    msg: errorMsg
                }
            })
        res.send(obj)
    }


}

let viewUserProfile = async (req, res) => {
    let obj
    let { id } = req.body

    await userModel.findOne({ _id: id })
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

let alluserProfile=async (req,res)=>{
    let obj
    await userModel.find()
    .then((resApi)=>obj={
        status:1,
        data:resApi
    })
    .catch((error)=>{
        obj={
            status:0,
            msg:'no data'
        }
    })
    res.send(obj)
}

module.exports = { sendOtp, createUserAccount, loginAccount, updateUserProfile, getsinglProfileData, changePassword, viewUserProfile ,alluserProfile}