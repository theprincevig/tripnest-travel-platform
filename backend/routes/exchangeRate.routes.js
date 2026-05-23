const express = require('express');
const { getExchangeRate } = require('../controllers/exchangeRate.controller.js');

const router = express.Router();

router.get("/", getExchangeRate);

module.exports =  router;