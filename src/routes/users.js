const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User");

// Get my profile
router.get("/me", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-aadhaarHash");
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;