const Lending = require("../models/Lending");
const Borrowing = require("../models/Borrowing");

const createLending = async (ownerId, data) => {
    const lending = await Lending.create({
        owner: ownerId,
        itemName: data.itemName,
        category: data.category,
        description: data.description,
        availableFromDate: data.availableFromDate,
        availableFromTime: data.availableFromTime,
        location: {
            type: "Point",
            coordinates: data.coordinates || [0, 0]
        }
    });

    return lending;
};

const getAllLendings = async () => {
    const lendings = await Lending.find({ status: "available" })
        .populate("owner", "name phone role")
        .sort({ _id: -1 });

    return lendings;
};

const getLendingById = async (lendingId) => {
    const lending = await Lending.findById(lendingId)
        .populate("owner", "name phone role")
        .populate("requests.borrower", "name phone");

    if (!lending) throw new Error("Lending not found");
    return lending;
};

const requestToBorrow = async (lendingId, borrowerId) => {
    const lending = await Lending.findById(lendingId);
    if (!lending) throw new Error("Lending not found");
    if (lending.status !== "available") throw new Error("Item is not available");

    // Check if already requested
    const alreadyRequested = lending.requests.find(
        r => r.borrower.toString() === borrowerId.toString()
    );
    if (alreadyRequested) throw new Error("You have already requested this item");

    // Add request to lending
    lending.requests.push({ borrower: borrowerId });
    await lending.save();

    // Create borrowing record
    const borrowing = await Borrowing.create({
        borrower: borrowerId,
        lendingId: lendingId,
        itemName: lending.itemName,
        lender: lending.owner
    });

    return borrowing;
};

const acceptRequest = async (lendingId, borrowerId, ownerId) => {
    const lending = await Lending.findById(lendingId);
    if (!lending) throw new Error("Lending not found");
    if (lending.owner.toString() !== ownerId.toString()) throw new Error("Not authorized");

    // Update request status in lending
    const request = lending.requests.find(
        r => r.borrower.toString() === borrowerId.toString()
    );
    if (!request) throw new Error("Request not found");

    request.status = "accepted";
    lending.status = "borrowed";
    await lending.save();

    // Update borrowing record
    await Borrowing.findOneAndUpdate(
        { lendingId, borrower: borrowerId },
        { status: "accepted" }
    );

    return lending;
};

const rejectRequest = async (lendingId, borrowerId, ownerId) => {
    const lending = await Lending.findById(lendingId);
    if (!lending) throw new Error("Lending not found");
    if (lending.owner.toString() !== ownerId.toString()) throw new Error("Not authorized");

    const request = lending.requests.find(
        r => r.borrower.toString() === borrowerId.toString()
    );
    if (!request) throw new Error("Request not found");

    request.status = "rejected";
    await lending.save();

    await Borrowing.findOneAndUpdate(
        { lendingId, borrower: borrowerId },
        { status: "rejected" }
    );

    return lending;
};

module.exports = {
    createLending,
    getAllLendings,
    getLendingById,
    requestToBorrow,
    acceptRequest,
    rejectRequest
};