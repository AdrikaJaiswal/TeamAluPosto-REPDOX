const mongoose = require("mongoose");


const aadhaarVerificationSchema = new mongoose.Schema({


    userId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    aadhaarHash:{

        type:String,

        required:true

    },


    verified:{


        type:Boolean,


        default:false


    },


    source:{


        type:String,


        default:"Mock DigiLocker"


    }


});


module.exports = mongoose.model(

    "AadhaarVerification",

    aadhaarVerificationSchema

);