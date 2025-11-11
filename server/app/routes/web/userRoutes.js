let express=require('express')
const { sendOtp, createUserAccount, loginAccount, updateUserProfile, getsinglProfileData, changePassword, viewUserProfile, alluserProfile } = require('../../controller/web/userRegisterController')
const { checkToken } = require('../../middleware/checkToken')

let userRoutes=express.Router()

userRoutes.post('/send-otp',sendOtp)
userRoutes.post('/create-account',createUserAccount)
userRoutes.post('/login',loginAccount)

userRoutes.get('/single-profiledata/:id',getsinglProfileData)
userRoutes.post('/update-profile',checkToken,updateUserProfile)
userRoutes.post('/change-password',checkToken,changePassword)
userRoutes.post('/view-userProfile',checkToken,viewUserProfile)

userRoutes.get('/all-userprofile',alluserProfile)
module.exports={userRoutes}