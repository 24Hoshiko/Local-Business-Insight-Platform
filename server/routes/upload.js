// server/routes/upload.js
const express = require('express');
const multer = require('multer');
const CsvData = require('../models/Data');
const csv = require('csv-parser'); // Add csv-parser library for parsing CSV

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

// Upload CSV route
router.post('/upload-csv', upload.single('file'), (req, res) => {
    const results = [];

    // Read the uploaded CSV file
    const csvFilePath = req.file.path;

    // Parse the CSV file and save to MongoDB
    require('fs').createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await Data.insertMany(results); // Insert parsed data into MongoDB
                res.status(200).send('File uploaded and data saved to database.');
            } catch (error) {
                console.error('Error saving data to MongoDB:', error);
                res.status(500).send('Failed to save data to database.');
            }
        });
});

module.exports = router;
