const Listing = require("../models/listing.model.js");
const Review = require("../models/review.model.js");

module.exports.getReviews = async (req, res) => {
    const { listingId } = req.params;

    try {
        const reviews = await Review.find({ listing: listingId })
            .populate("author", "username");

        return res.status(200).json({
            success: true,
            message: "Get Reviews!",
            reviews
        });
    } catch (error) {
        console.error("Get Review Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.createReview = async (req, res) => {
    const { listingId } = req.params;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ success: false, error: "Listing not found" });

        const review = await Review.create({
            rating,
            comment,
            listing: listingId,
            author: userId
        });

        listing.reviews.push(review._id);
        await listing.save();

        return res.status(200).json({
            success: true,
            message: "Review created successfully!",
            review
        });
    } catch (error) {
        console.error("Create Review Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.deleteReview = async (req, res) => {
    const { listingId, reviewId } = req.params;

    try {
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ success: false, error: "Review not found" });

        await Listing.findByIdAndDelete(
            listingId,
            { $pull: { reviews: reviewId } }
        );

        await Review.findByIdAndDelete(reviewId);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully!"
        });
    } catch (error) {
        console.error("Delete Review Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};