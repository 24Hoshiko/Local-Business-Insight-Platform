const express = require('express');
const router = express.Router();
const createOrder = require('../controllers/formController.js');

router.post('/', createOrder);

module.exports = router;