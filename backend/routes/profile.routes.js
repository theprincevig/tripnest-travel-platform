const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { storage } = require('../configs/cloud.config.js');
const profileController = require('../controllers/profile.controller.js');
const multer = require('multer');
const upload = multer({ storage });

const router = express.Router();

router.route("/me")
    .get(
        verifyToken,
        profileController.viewProfile
    )
    .patch(
        verifyToken,
        upload.single("picture"),
        profileController.updateProfile
    );

router.patch(
    "/become-host",
    verifyToken,
    profileController.becomeHost
);

module.exports = router;