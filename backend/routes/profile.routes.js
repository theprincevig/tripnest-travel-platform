const express = require('express');
const { verifyToken, optionalAuth } = require('../middlewares/auth.middleware');
const { storage } = require('../configs/cloud.config.js');
const profileController = require('../controllers/profile.controller.js');
const multer = require('multer');
const upload = multer({ storage });

const router = express.Router();

router.route("/me")
    .get(
        verifyToken,
        profileController.getOwnProfile
    )
    .patch(
        verifyToken,
        upload.single("picture"),
        profileController.updateProfile
    );

router.patch(
    "/host",
    verifyToken,
    profileController.becomeHost
);

router.get(
    "/:username",
    optionalAuth,
    profileController.viewProfile
);

router.patch(
    "/me/currency",
    verifyToken,
    profileController.changeCurrency
);

module.exports = router;