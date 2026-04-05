const Listing = require("../models/listing.model.js");
const Review = require("../models/review.model.js");
const AppError = require("../errors/AppError.js");

module.exports.isListingOwner = async (req, res, next) => {
    const { listingId } = req.params;

    const listing = await Listing.findById(listingId);

    if (!listing) {
        return next(new AppError(404, "Listing not found"));
    }

    if (listing.owner.toString() !== req.user.id) {
        return next(new AppError(403, "You are not the owner of this listing"));
    }

    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        return next(new AppError(404, "Review not found"));
    }

    if (review.author.toString() !== req.user.id) {
        return next(new AppError(403, "You are not the author of this review"));
    }

    next();
};