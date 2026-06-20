const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AadhaarVerification = require("../models/AadhaarVerification");

// Mock DigiLocker - simulates aadhaar verification
const mockDigiLockerVerify = async (aadhaarNumber) => {
    // In real life this would call DigiLocker API
    // For hackathon we just check if it's a valid 12 digit number
    if (aadhaarNumber.length !== 12 || isNaN(aadhaarNumber)) {
        return { verified: false };
    }
    return { verified: true, name: "Verified User" };
};

const registerUser = async (name, phone, role, aadhaarNumber, coordinates) => {
    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
        throw new Error("User already exists with this phone number");
    }

    // Mock DigiLocker verification
    const verification = await mockDigiLockerVerify(aadhaarNumber);
    if (!verification.verified) {
        throw new Error("Aadhaar verification failed");
    }

    // Hash aadhaar number before storing
    const aadhaarHash = await bcrypt.hash(aadhaarNumber, 10);

    // Create user
    const user = await User.create({
        name,
        phone,
        role,
        aadhaarHash,
        aadhaarVerified: true,
        location: {
            type: "Point",
            coordinates: coordinates || [0, 0]
        }
    });

    // Store verification record
    await AadhaarVerification.create({
        userId: user._id,
        aadhaarHash,
        verified: true,
        source: "Mock DigiLocker"
    });

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { user, token };
};

const loginUser = async (phone, aadhaarNumber) => {
    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
        throw new Error("User not found");
    }

    // Check aadhaar
    const isMatch = await bcrypt.compare(aadhaarNumber, user.aadhaarHash);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { user, token };
};

module.exports = { registerUser, loginUser };