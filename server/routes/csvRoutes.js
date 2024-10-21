const express = require('express');
const { upload, importCSV } = require('../controllers/csvController');
const router = express.Router();

// POST route to upload CSV file
router.post('/upload-csv', upload.single('csvFile'), importCSV);

module.exports = router;
