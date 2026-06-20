const mongoose = require("mongoose");


const borrowingSchema = new mongoose.Schema({


    borrower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    


    category:{
        type:String
    },


    requestDate:{
        type:Date,
        default:Date.now
    },


    duration:{
        type:Number
    },


    status:{
        type:String,

        enum:[
            "pending",
            "accepted",
            "completed",
            "rejected"
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