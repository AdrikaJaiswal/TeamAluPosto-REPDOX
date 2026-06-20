const mongoose = require("mongoose");


const connectionSchema = new mongoose.Schema({


    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    connectionType:{


        type:String,


        enum:[

            "lending",
            "transport"

        ]


    },


    status:{


        type:String,


        enum:[

            "active",
            "blocked"

        ],


        default:"active"


    }


});


module.exports = mongoose.model(
    "Connection",
    connectionSchema
);