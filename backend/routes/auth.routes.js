const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware.js');
const authController = require('../controllers/auth.controller.js');

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/google", authController.googleLogin);

router.get(
    "/session",
    verifyToken,
    authController.session
);

router.get(
    "/get-user",
    verifyToken,
    authController.getUser
);

router.post(
    "/change-password",
    verifyToken,
    authController.changePassword
);

router.delete(
    "/logout",
    verifyToken,
    authController.logout
);

module.exports = router;