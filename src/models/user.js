const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["farmer", "transporter", "lender", "borrower"],
        required: true
    },
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: [Number]  // [longitude, latitude]
    },
    aadhaarVerified: {
        type: Boolean,
        default: false
    },
    aadhaarHash: {
        type: String,
        default: null
    },
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);