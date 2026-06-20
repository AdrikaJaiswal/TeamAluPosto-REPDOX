const mongoose = require("mongoose");


const transportPoolSchema = new mongoose.Schema({


    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    cropType:{
        type:String,
        required:true
    },


    readyDate:{
        type:Date,
        required:true
    },


    packageType:{
        type:String,
        required:true
    },


    totalWeight:{
        type:Number,
        required:true
    },


    pickupLocation:{
        type:String,
        required:true
    },


    dropLocation:{
        type:String,
        required:true
    },


    // people who joined successfully

    members:[{


        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },


        weight:{
            type:Number
        }


    }],



    // incoming requests

    requests:[{


        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },


        requestedWeight:{
            type:Number
        },


        status:{


            type:String,


            enum:[

                "pending",
                "accepted",
                "rejected"

            ],


            default:"pending"


        }


    }],



    status:{


        type:String,


        enum:[

            "open",
            "full",
            "completed"

        ],


        default:"open"


    }


});



module.exports = mongoose.model(
    "TransportPool",
    transportPoolSchema
);