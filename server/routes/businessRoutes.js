const express = require('express');
const {signInBusiness, signUpBusiness, getBusinessById} = require('../controllers/businessController.js');
const router = express.Router();

router.post('/signin', signInBusiness);

router.post('/signup', signUpBusiness);

router.get('/:id', getBusinessById);

module.exports = router;