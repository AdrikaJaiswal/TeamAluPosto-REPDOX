const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Borrowing = require("../models/Borrowing");

// Get all my borrow requests
router.get("/my", authMiddleware, async (req, res, next) => {
    try {
        const borrowings = await Borrowing.find({ borrower: req.user.id })
            .populate("lendingId", "itemName category status")
            .populate("lender", "name phone");
        res.status(200).json({ success: true, borrowings });
    } catch (error) {
        next(error);
    }
});

module.exports = router;