const express = require('express');
const { verifyToken } = require('../middlewares/auth.middleware.js');
const reservationController = require('../controllers/reservation.controller.js');

const router = express.Router({ mergeParams: true });

router.post(
    "/",
    verifyToken,
    reservationController.createReservation
);

router.delete(
    "/:reserveId/cancel",
    verifyToken,
    reservationController.cancelReservation
);

module.exports = router;