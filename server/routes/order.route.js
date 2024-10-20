const express = require('express');
const router = express.Router();
const createOrder = require('../controllers/order.controller.js');

router.post('/', createOrder);

module.exports = router;
