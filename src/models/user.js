const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },


    phone:{
        type:String,
        required:true,
        unique:true
    },


    role:{
        type:String,
        enum:[
            "farmer",
            "transporter",
            "lender",
            "borrower"
        ],
        required:true
    },


    aadhaar_verified:{
        type:Boolean,
        default:false
    },


    location:{
        type:String
    },


    rating:{
        type:Number,
        default:5
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model("User",userSchema);