const express = require('express');
const reviewController = require('../controllers/review.controller.js');
const { verifyToken } = require('../middlewares/auth.middleware');
const { isReviewAuthor } = require('../middlewares/ownership.middleware');

const router = express.Router({ mergeParams: true });

router.route("/")
    .get(reviewController.getReviews)
    .post(
        verifyToken,
        reviewController.createReview
    );

router.delete(
    "/:reviewId",
    verifyToken,
    isReviewAuthor,
    reviewController.deleteReview
);

module.exports = router;