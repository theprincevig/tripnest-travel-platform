const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true
    },
    guestsCount: {
        type: Number,
        min: 1,
        default: 1,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled", "completed"],
        default: "confirmed"
    },
    cancelledAt: {
        type: Date,
        default: null
    },
    cancellationCharge: {
        type: Number,
        default: 0
    },
    refundAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);