const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/review.model.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    image: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "beach",
            "mountain",
            "city",
            "cabin",
            "hotel",
            "villa",
            "camping",
            "apartment"
        ],
        index: true
    },
    location: {
        type: String,
        index: true
    },
    country: {
        type: String,
        index: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

listingSchema.post("findOneAndDelete", async (doc) => {
    if (!doc) return;
    await Review.deleteMany({ listing: doc._id });
});

module.exports = mongoose.models.Listing || mongoose.model("Listing", listingSchema);