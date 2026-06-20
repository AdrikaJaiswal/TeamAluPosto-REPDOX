const {
    createTransportRequest,
    getAllTransports,
    getTransportById,
    sendJoinRequest,
    acceptJoinRequest,
    rejectJoinRequest
} = require("../services/transport.service");

const create = async (req, res, next) => {
    try {
        const transport = await createTransportRequest(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Transport request created successfully",
            transport
        });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const transports = await getAllTransports();
        res.status(200).json({
            success: true,
            transports
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const transport = await getTransportById(req.params.id);
        res.status(200).json({
            success: true,
            transport
        });
    } catch (error) {
        next(error);
    }
};

const joinRequest = async (req, res, next) => {
    try {
        const transport = await sendJoinRequest(
            req.params.id,
            req.user.id,
            req.body.requestedWeight
        );
        res.status(201).json({
            success: true,
            message: "Join request sent successfully",
            transport
        });
    } catch (error) {
        next(error);
    }
};

const accept = async (req, res, next) => {
    try {
        const result = await acceptJoinRequest(
            req.params.id,
            req.params.senderId,
            req.user.id
        );
        res.status(200).json({
            success: true,
            message: "Request accepted - contact details revealed",
            creator: result.creator,
            sender: result.sender,
            transport: result.transport
        });
    } catch (error) {
        next(error);
    }
};

const reject = async (req, res, next) => {
    try {
        const transport = await rejectJoinRequest(
            req.params.id,
            req.params.senderId,
            req.user.id
        );
        res.status(200).json({
            success: true,
            message: "Request rejected",
            transport
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { create, getAll, getById, joinRequest, accept, reject };