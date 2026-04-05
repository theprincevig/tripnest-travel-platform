const express = require('express');
const listingController = require('../controllers/listing.controller.js');
const { verifyToken } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { storage } = require('../configs/cloud.config.js');
const multer = require('multer');
const { isListingOwner } = require('../middlewares/ownership.middleware');
const upload = multer({ storage });

const router = express.Router();

router.route("/")
    .get(listingController.getAllListings)
    .post(
        verifyToken,
        authorizeRoles("host"),
        upload.single("image"),
        listingController.createListing
    );

router.route("/:listingId")
    .get(listingController.getListing)
    .patch(
        verifyToken,
        isListingOwner,
        authorizeRoles("host"),
        upload.single("image"),
        listingController.updateListing
    )
    .delete(
        verifyToken,
        isListingOwner,
        authorizeRoles("host"),
        listingController.deleteListing
    );

module.exports = router;