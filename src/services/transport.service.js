const TransportPool = require("../models/transport_pool");
const User = require("../models/user");

const createTransportRequest = async (creatorId, data) => {
    const transport = await TransportPool.create({
        creator: creatorId,
        cropType: data.cropType,
        readyDate: data.readyDate,
        packageType: data.packageType,
        totalWeight: data.totalWeight,
        pickupLocation: {
            type: "Point",
            coordinates: data.pickupCoordinates || [0, 0]
        },
        dropLocation: {
            type: "Point",
            coordinates: data.dropCoordinates || [0, 0]
        }
    });

    return transport;
};

const getAllTransports = async () => {
    const transports = await TransportPool.find({ status: "open" })
        .populate("creator", "name role")
        .sort({ _id: -1 });

    return transports;
};

const getTransportById = async (transportId) => {
    const transport = await TransportPool.findById(transportId)
        .populate("creator", "name role")
        .populate("members.user", "name role")
        .populate("requests.sender", "name role");

    if (!transport) throw new Error("Transport request not found");
    return transport;
};

const sendJoinRequest = async (transportId, senderId, requestedWeight) => {
    const transport = await TransportPool.findById(transportId);
    if (!transport) throw new Error("Transport not found");
    if (transport.status !== "open") throw new Error("Transport pool is not open");

    const alreadyRequested = transport.requests.find(
        r => r.sender.toString() === senderId.toString()
    );
    if (alreadyRequested) throw new Error("You have already sent a request");

    transport.requests.push({
        sender: senderId,
        requestedWeight
    });
    await transport.save();

    return transport;
};

const acceptJoinRequest = async (transportId, senderId, creatorId) => {
    const transport = await TransportPool.findById(transportId);
    if (!transport) throw new Error("Transport not found");
    if (transport.creator.toString() !== creatorId.toString()) throw new Error("Not authorized");

    const request = transport.requests.find(
        r => r.sender.toString() === senderId.toString()
    );
    if (!request) throw new Error("Request not found");

    request.status = "accepted";

    // Add to members
    transport.members.push({
        user: senderId,
        weight: request.requestedWeight
    });

    await transport.save();

    // Reveal phone numbers of both parties
    const creator = await User.findById(creatorId).select("name phone");
    const sender = await User.findById(senderId).select("name phone");

    return { transport, creator, sender };
};

const rejectJoinRequest = async (transportId, senderId, creatorId) => {
    const transport = await TransportPool.findById(transportId);
    if (!transport) throw new Error("Transport not found");
    if (transport.creator.toString() !== creatorId.toString()) throw new Error("Not authorized");

    const request = transport.requests.find(
        r => r.sender.toString() === senderId.toString()
    );
    if (!request) throw new Error("Request not found");

    request.status = "rejected";
    await transport.save();

    return transport;
};

module.exports = {
    createTransportRequest,
    getAllTransports,
    getTransportById,
    sendJoinRequest,
    acceptJoinRequest,
    rejectJoinRequest
};