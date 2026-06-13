const Listing = require("../models/listing.model.js");
const Reservation = require("../models/reservation.model.js");

module.exports.getReservations = async (req, res) => {
    const userId = req.user._id;

    try {
        const reservations = await Reservation.find({
            guest: userId
        })
        .populate("listing", "title image price location country")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalReservations: reservations.length,
            reservations
        });

    } catch (error) {
        console.error("Get Reservations Error:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.createReservation = async (req, res) => {
    const userId = req.user._id;
    const { listingId } = req.params;
    const { checkIn, checkOut, guestsCount = 1 } = req.body;

    try {
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({
                success: false,
                error: "Listing not found"
            });
        }

        if (listing.owner.toString() === userId.toString()) {
            return res.status(400).json({
                success: false,
                error: "You cannot reserve your own listing"
            });
        }

        if (guestsCount < 1) {
            return res.status(400).json({
                success: false,
                error: "Guest count must be at least 1"
            });
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        if (isNaN(checkInDate.getTime()) ||
        isNaN(checkOutDate.getTime())) {
            return res.status(400).json({
                success: false,
                error: "Invalid dates"
            });
        }

        if (checkInDate <= new Date()) {
            return res.status(400).json({
                success: false,
                error: "Check-in must be in the future"
            });
        }

        if (checkInDate >= checkOutDate) {
            return res.status(400).json({
                success: false,
                error: "Check-out must be after check-in"
            });
        }

        // Date overlap check
        const existing = await Reservation.findOne({
            listing: listingId,
            status: "confirmed",
            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate },
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                error: "Property already booked for selected dates"
            });
        }

        const nights = Math.ceil(
            (checkOutDate - checkInDate) / 
            (1000 * 60 * 60 * 24)
        );

        const totalPrice = 
            (nights * listing.price).toFixed(2);
            
        const reservation = await Reservation.create({
            listing: listingId,
            guest: userId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guestsCount: guestsCount,
            totalPrice
        });

        return res.status(201).json({
            success: true,
            message: "Reservation created successfully!",
            reservation
        });

    } catch (error) {
        console.error("Create Reservation Error:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.cancelReservation = async (req, res) => {
    const { reserveId } = req.params;
    const userId = req.user._id;

    try {
        const reservation = await Reservation.findById(reserveId);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                error: "Reservation not found"
            });
        }

        // Only booking owner can cancel
        if (reservation.guest.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized"
            });
        }

        if (reservation.status === "cancelled") {
            return res.status(400).json({
                success: false,
                error: "Reservation already cancelled"
            });
        }

        const now = new Date();
        if (now >= reservation.checkIn) {
            return res.status(400).json({
                success: false,
                error: "Reservation can no longer be cancelled"
            });
        }

        const hoursbeforeCheckIn = 
            (reservation.checkIn - now) / 
            (1000 * 60 * 60);

        let cancellationCharge = 0;
        if (hoursbeforeCheckIn <= 24) {
            cancellationCharge = reservation.totalPrice * 0.10;
        }

        const refundAmount = 
            reservation.totalPrice - 
            cancellationCharge;

        reservation.status = "cancelled";
        reservation.cancelledAt = now;
        reservation.cancellationCharge = cancellationCharge;
        reservation.refundAmount = refundAmount;

        await reservation.save();

        return res.status(200).json({
            success: true,
            message: "Reservation cancelled!",
            cancellationCharge,
            refundAmount,
            reservation
        });

    } catch (error) {
        console.error("Cancel Reservation Error:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};