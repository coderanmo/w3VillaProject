let mongoose=require('mongoose')

let adminAuthSchema=mongoose.Schema({
    adminEmail:{
        type:String,
        trim: true,
        lowercase: true,
        unique:true,
        required:[true,'email is required']
    },
    adminPassword:{
        type:String,
       
    }
})

let adminAuthModel=mongoose.model('adminauth',adminAuthSchema)

module.exports={adminAuthModel}