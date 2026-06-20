const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        const { name, phone, role, aadhaarNumber, coordinates } = req.body;

        if (!name || !phone || !role || !aadhaarNumber) {
            return res.status(400).json({
                success: false,
                message: "Name, phone, role and aadhaar number are required"
            });
        }

        const result = await registerUser(name, phone, role, aadhaarNumber, coordinates);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                phone: result.user.phone,
                role: result.user.role,
                aadhaarVerified: result.user.aadhaarVerified
            }
        });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { phone, aadhaarNumber } = req.body;

        if (!phone || !aadhaarNumber) {
            return res.status(400).json({
                success: false,
                message: "Phone and aadhaar number are required"
            });
        }

        const result = await loginUser(phone, aadhaarNumber);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                phone: result.user.phone,
                role: result.user.role,
                aadhaarVerified: result.user.aadhaarVerified
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };