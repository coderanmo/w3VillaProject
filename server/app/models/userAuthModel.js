let mongoose = require('mongoose')
let userSchema = mongoose.Schema({

    userName: {
        type: String,
        require: [true, 'user name is required']
    },
    userEmail: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        trim: true,
        lowercase: true,
    },
    userPassword: {
        type: String,
        required: [true, 'password is required'],
        
    },
    otp: {
        type: Number,
        required: [true, 'Otp is required']
    },
    userPhone: {
        type: Number
    },
    userGender: {
        type: String
    },
    userAddress: {
        type: String
    }
})

let userModel = mongoose.model('user', userSchema)
module.exports = { userModel }