const mongoose = require("mongoose");


const lendingSchema = new mongoose.Schema({

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

    pricePerHr:{
        type:Number,
        default:0
    },


    location:{
        type:String
    },


    available:{
        type:Boolean,
        default:true
    },


    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model(
    "Lending",
    lendingSchema
);