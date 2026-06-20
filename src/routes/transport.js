const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
    create,
    getAll,
    getById,
    joinRequest,
    accept,
    reject
} = require("../controllers/transport.controller");

// See all open transport requests
router.get("/all", authMiddleware, getAll);

// Get one transport request by id
router.get("/:id", authMiddleware, getById);

// Create a transport request
router.post("/create", authMiddleware, create);

// Send a join request
router.post("/:id/request", authMiddleware, joinRequest);

// Accept a join request - reveals phone numbers
router.post("/:id/accept/:senderId", authMiddleware, accept);

// Reject a join request
router.post("/:id/reject/:senderId", authMiddleware, reject);

module.exports = router;