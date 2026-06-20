const {
    createLending,
    getAllLendings,
    getLendingById,
    requestToBorrow,
    acceptRequest,
    rejectRequest
} = require("../services/lending.service");

const create = async (req, res, next) => {
    try {
        const lending = await createLending(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Lending created successfully",
            lending
        });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const lendings = await getAllLendings();
        res.status(200).json({
            success: true,
            lendings
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const lending = await getLendingById(req.params.id);
        res.status(200).json({
            success: true,
            lending
        });
    } catch (error) {
        next(error);
    }
};

const sendRequest = async (req, res, next) => {
    try {
        const borrowing = await requestToBorrow(req.params.id, req.user.id);
        res.status(201).json({
            success: true,
            message: "Borrow request sent successfully",
            borrowing
        });
    } catch (error) {
        next(error);
    }
};

const accept = async (req, res, next) => {
    try {
        const lending = await acceptRequest(req.params.id, req.params.borrowerId, req.user.id);
        res.status(200).json({
            success: true,
            message: "Request accepted",
            lending
        });
    } catch (error) {
        next(error);
    }
};

const reject = async (req, res, next) => {
    try {
        const lending = await rejectRequest(req.params.id, req.params.borrowerId, req.user.id);
        res.status(200).json({
            success: true,
            message: "Request rejected",
            lending
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { create, getAll, getById, sendRequest, accept, reject };