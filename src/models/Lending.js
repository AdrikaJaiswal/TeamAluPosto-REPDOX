const mongoose = require("mongoose");


const lendingSchema = new mongoose.Schema({


    // person giving the equipment/resource

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    itemName:{
        type:String,
        required:true
    },


    category:{
        type:String,
        required:true
    },


    description:{
        type:String
    },


    availableFromDate:{
        type:Date,
        required:true
    },


    availableFromTime:{
        type:String,
        required:true
    },


    location:{
        type:String,
        required:true
    },


    // people asking to borrow

    requests:[{


        borrower:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },


        status:{
            type:String,

            enum:[
                "pending",
                "accepted",
                "rejected"
            ],

            default:"pending"
        },


        requestedAt:{
            type:Date,
            default:Date.now
        }


    }],



    status:{


        type:String,


        enum:[

            "available",
            "borrowed",
            "completed"

        ],


        default:"available"


    },



});



module.exports = mongoose.model(
    "Lending",
    lendingSchema
);