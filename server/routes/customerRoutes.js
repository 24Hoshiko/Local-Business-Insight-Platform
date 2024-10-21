const express = require('express');
const { signInCustomer, signUpCustomer, getCustomerById } = require('../controllers/customer');
const router = express.Router();

router.post('/signin', signInCustomer);

router.post('/signup', signUpCustomer);

router.get('/:id', getCustomerById);

module.exports = router;