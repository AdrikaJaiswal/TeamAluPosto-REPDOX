const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
    create,
    getAll,
    getById,
    sendRequest,
    accept,
    reject
} = require("../controllers/lending.controller");

// Anyone logged in can see all lendings
router.get("/all", authMiddleware, getAll);

// Get one lending by id
router.get("/:id", authMiddleware, getById);

// Create a new lending post
router.post("/create", authMiddleware, create);

// Borrower sends a request
router.post("/:id/request", authMiddleware, sendRequest);

// Owner accepts a borrower's request
router.post("/:id/accept/:borrowerId", authMiddleware, accept);

// Owner rejects a borrower's request
router.post("/:id/reject/:borrowerId", authMiddleware, reject);

module.exports = router;