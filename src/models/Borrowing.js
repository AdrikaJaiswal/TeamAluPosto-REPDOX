const mongoose = require("mongoose");


const borrowingSchema = new mongoose.Schema({


    borrower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    lendingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lending",
        required:true
    },


    itemName:{
        type:String
    },


    message:{
        type:String
    },


    status:{


        type:String,


        enum:[

            "pending",
            "accepted",
            "rejected",
            "completed"

        ],


        default:"pending"


    },


    lender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }


});



module.exports = mongoose.model(
    "Borrowing",
    borrowingSchema
);