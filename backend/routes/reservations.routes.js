const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware.js');
const reservationController = require('../controllers/reservation.controller.js');

const router = express.Router();

router.get(
    "/me",
    verifyToken,
    reservationController.getReservations
);

module.exports = router;