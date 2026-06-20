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


    location:{
        type:String
    },


    // Mock DigiLocker Aadhaar verification

    aadhaarVerified:{
        type:Boolean,
        default:false
    },


    aadhaarHash:{
        type:String,
        default:null
    },


    // Users connected after accepting requests

    connections:[{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User"

    }],


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "User",
    userSchema
);