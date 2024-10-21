const express = require('express');
const { upload, importCSV } = require('../controllers/importdataController');
const router = express.Router();

// POST route to upload CSV file
router.post('/', upload.single('csvFile'), importCSV);

module.exports = router;